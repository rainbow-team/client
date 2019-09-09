import { Component, OnInit, Input, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { LayoutChangeService } from '../../services/layout-change.service';
import { NavMenuState, ContentPanelState } from 'src/app/utilities/enum';
import { NavMenu, NavMenuItem } from 'src/app/utilities/entities/navMenu';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  @Input()
  navMenu: NavMenu = [];

  checkedTopItem: any = {};

  subRouterEvent: Subscription;

  permissionList: any = [];

  constructor(private router: Router,
    private zone: NgZone,
    private layoutService: LayoutChangeService) {
  }

  ngOnInit() {

    let pers = sessionStorage.getItem("permission");
    if (pers) {
      this.permissionList = JSON.parse(pers);

      this.navMenu.forEach(element => {
        this.handleMenu(element);
      });

    }

    // 默认打开第一个菜单
    let currentUrl = this.router.url;

    for (let i = 0; i < this.navMenu.length; i++) {
      if (currentUrl.indexOf(this.navMenu[i].id) > -1) {
        this.checkedTopItem = this.navMenu[i];
        break;
      }
    }
  }

  handleMenu(item, parent = null) {

    if (item.children && item.children.length > 0) {

      item.children.forEach(element => {
        this.handleMenu(element, item);
      });
    } else {

      this.permissionList.forEach(element => {
        if (element.indexOf(":") != element.lastIndexOf(":")) {

          let str = (parent ? parent.id : "") + ":" + item.id;
          if (element.indexOf(str) > -1) {
            item.isShow = true;
            parent.isShow = true;
          }

        } else {
          if (element.indexOf(item.id) > -1) {
            item.isShow = true;
            if (parent) {
              parent.isShow = true;
              //核安全监管机构特殊处理
              if (parent.id == "SafetyRegulator") {
                this.navMenu[1].isShow = true;
              }
            }

          }
        }
      });
    }

  }

  // 菜单项选中
  menuItemClick(menuItem1: NavMenuItem, menuItem2: NavMenuItem, menuItem3: NavMenuItem) {
    let checkedItem = null;
    let breadcrumbName = [];

    if (menuItem3) {
      checkedItem = menuItem3;
      breadcrumbName.push(menuItem1.name);
      breadcrumbName.push(menuItem2.name);
      breadcrumbName.push(menuItem3.name);
    } else if (menuItem2) {
      breadcrumbName.push(menuItem1.name);
      breadcrumbName.push(menuItem2.name);
      checkedItem = menuItem2;
    } else {
      breadcrumbName.push(menuItem1.name);
      checkedItem = menuItem1;
    }

    this.checkedTopItem = menuItem1;

    // 路由跳转
    if (checkedItem.route) {

      this.layoutService.routeChange.next(breadcrumbName);
      this.router.navigate([checkedItem.route]);

    }
  }

  ngOnDestroy() {
    if (this.subRouterEvent) {
      this.subRouterEvent.unsubscribe();
    }
  }
}

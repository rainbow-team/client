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

  checkedItem: any;

  subRouterEvent: Subscription;

  constructor(private router: Router,
    private zone: NgZone,
    private layoutService: LayoutChangeService) {
  }

  ngOnInit() {
    // 默认打开第一个菜单
    this.menuItemClick(this.navMenu[0], null, null);
  }

  // 菜单项选中
  menuItemClick(menuItem1: NavMenuItem, menuItem2: NavMenuItem, menuItem3: NavMenuItem) {
    this.checkedItem = null;
    let breadcrumbName = [];

    if (menuItem3) {
      this.checkedItem = menuItem3;
      breadcrumbName.push(menuItem1.name);
      breadcrumbName.push(menuItem2.name);
      breadcrumbName.push(menuItem3.name);
    } else if (menuItem2) {
      breadcrumbName.push(menuItem1.name);
      breadcrumbName.push(menuItem2.name);
      this.checkedItem = menuItem2;
    } else {
      breadcrumbName.push(menuItem1.name);
      this.checkedItem = menuItem1;
    }

    // 路由跳转
    if (this.checkedItem.route) {

      this.layoutService.routeChange.next(breadcrumbName);
      this.router.navigate([this.checkedItem.route]);
      
    }
  }

  ngOnDestroy() {
    if (this.subRouterEvent) {
      this.subRouterEvent.unsubscribe();
    }
  }
}

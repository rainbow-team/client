import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
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
  collapsed = false;

  @Input()
  navMenu: NavMenu = [];

  isCollapsed = false;

  subRouterEvent: Subscription;

  constructor(private router: Router,
    private zone: NgZone,
    private layoutService: LayoutChangeService) {
  }

  ngOnInit() {
    // 订阅路由跳转事件
    this.subRouterEvent = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.setMenuStateByUrl(e.url);
      });

    // 默认打开第一个菜单
    this.menuItemClick(this.navMenu[0]);
  }

  // 根据跳转路由设置菜单选中状态
  setMenuStateByUrl(url: string): void {
    // 展开菜单对象数组
    let menuItemList = _.flatMapDeep(this.navMenu, (item) => {
      return [item].concat(item.children ? item.children : []);
    });
    let checkedItem = menuItemList.find(x => x.route === url);
    if (checkedItem) {
      this.menuItemClick(checkedItem);
    }
  }

  // 菜单项选中
  menuItemClick(menuItem: NavMenuItem) {
    let checkedItem = menuItem;
    if (menuItem.children && menuItem.children) {
      checkedItem = menuItem.children[0];
    }
    // 设置菜单状态
    this.zone.runOutsideAngular(() => {
      this.navMenu.forEach(item => {
        item.selected = (item.id === checkedItem.id);
        if (item.children) {
          item.children.forEach(child => {
            child.selected = (child.id === checkedItem.id);
            if (child.selected) {
              item.selected = true;
            }
          });
        }
      });
    });
    this.zone.run(() => {
      this.navMenu = this.navMenu;
    });
    // 路由跳转
    if (checkedItem.route) {
      this.router.navigate([checkedItem.route]);
    }
  }

  // 一级菜单展开
  subMenuOpen(isOpen: boolean, subMenu: NavMenuItem): void {
    if (isOpen) {
      this.menuItemClick(subMenu);
    }
  }

  // 菜单展开折叠
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.layoutService.setNavMenuState(this.isCollapsed ? NavMenuState.Collapsed : NavMenuState.Expand);
    this.layoutService.setContentPanelState(this.collapsed ? ContentPanelState.Maximize : ContentPanelState.Normal);
  }

  ngOnDestroy() {
    if (this.subRouterEvent) {
      this.subRouterEvent.unsubscribe();
    }
  }
}

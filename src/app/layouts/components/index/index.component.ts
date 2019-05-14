import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutChangeService } from '../../services/layout-change.service';
import { NavMenuState, ContentPanelState } from 'src/app/utilities/enum';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { GlobalMapService } from 'src/app/common-modules/map/services/global-map.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  // 地图初始化
  mapInit = false;
  subsMapInit: Subscription;
  subNavMenuChange: Subscription;
  subContentChange: Subscription;

  showNavMenu = true;
  navMenuWidth = 200;
  contentWidth = '100%';

  navMenu: NavMenu = [
    { name: '首页', id: 'sy', route: '' },
    { name: '图斑入库', id: 'tbrk', route: '' },
    { name: '图斑核查', id: 'tbhc', route: '' },
    { name: '违法分类', id: 'wffl', route: '' },
    { name: '档案管理', id: 'dagl', route: '' },
    { name: '查询统计', id: 'cxtj', route: ''}
  ];

  constructor(private globalMap: GlobalMapService,
    private layoutService: LayoutChangeService) { }

  ngOnInit() {
    // 订阅地图初始化消息
    this.subsMapInit = this.globalMap.subMapInit.asObservable()
      .subscribe(() => {
        this.mapInit = true;
      });

    // 订阅导航菜单更改消息
    this.subNavMenuChange = this.layoutService.subNavMenu.asObservable()
      .subscribe((state: NavMenuState) => {
        switch (state) {
          case NavMenuState.Expand:
            this.showNavMenu = true;
            this.navMenuWidth = 200;
            break;
          case NavMenuState.Collapsed:
            this.showNavMenu = true;
            this.navMenuWidth = 80;
            break;
          case NavMenuState.Hidden:
            this.showNavMenu = false;
            this.navMenuWidth = 0;
            break;
        }
      });

    // 订阅内容面板改变消息
    this.subContentChange = this.layoutService.subContentPanel.asObservable()
      .subscribe((state: ContentPanelState) => {
        switch (state) {
          case ContentPanelState.Normal:
            this.contentWidth = '500px';
            break;
          case ContentPanelState.Maximize:
            this.contentWidth = '100%';
            break;
        }
      });

    // 初始化地图
    this.globalMap.initMap();
  }

  ngOnDestroy() {
    if (this.subsMapInit) {
      this.subsMapInit.unsubscribe();
    }
    if (this.subNavMenuChange) {
      this.subNavMenuChange.unsubscribe();
    }
  }
}

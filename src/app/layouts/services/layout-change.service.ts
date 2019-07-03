import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavMenuState, ContentPanelState } from '../../utilities/enum';

@Injectable({
  providedIn: 'root'
})
export class LayoutChangeService {

  subNavMenu = new Subject<NavMenuState>();
  subContentPanel = new Subject<ContentPanelState>();
  subWinResize = new Subject();
  routeChange = new Subject();

  constructor() { }

  // 获取窗口高度
  get windowHeight() {
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }

  // 获取滚动区域高度
  getScrollHeight(otherHeight = 0) {
    return this.windowHeight - otherHeight;
  }

  setNavMenuState(state: NavMenuState) {
    this.subNavMenu.next(state);
  }

  setContentPanelState(state: ContentPanelState) {
    this.subContentPanel.next(state);
  }

  notifyWinResize() {
    this.subWinResize.next();
  }
}

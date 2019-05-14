import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { loadModules, loadCss } from 'esri-loader';

@Injectable({
  providedIn: 'root'
})
export class GlobalMapService {

  // 地图相关配置对象
  mapConfig = AppConfig.mapConfig;

  mapInit = false;
  subMapInit = new Subject<any>();
  subMapLocate = new Subject<any>();

  constructor() {
    this.setMapProxyRule();
  }

  // 初始化地图
  initMap() {
    if (!this.mapInit) {
      this.mapInit = true;
      this.subMapInit.next();
    }
  }

  mapLocate() {
    this.subMapLocate.next();
  }

  // 设置地图服务代理规则
  private async setMapProxyRule() {
    let [urlUtils] = await loadModules([
      'esri/core/urlUtils'
    ], { url: this.mapConfig.arcgisApi });

    const rules: any[] = this.mapConfig.serviceHosts;
    if (rules && rules.length > 0) {
      rules.forEach((item) => {
        urlUtils.addProxyRule({
          urlPrefix: item,
          proxyUrl: this.mapConfig.arcgisProxy
        });
      });
    }
  }
}

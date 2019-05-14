import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { loadModules, loadCss } from 'esri-loader';
import { GlobalMapService } from '../../services/global-map.service';
import { Subscription } from 'rxjs';

// 加载arcgis地图样式
loadCss(AppConfig.mapConfig.arcgisApi + 'esri/css/main.css');

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit, OnDestroy {

  mapView = null;

  @ViewChild('mainmap')
  private mapElement: ElementRef;

  // 地图相关配置对象
  mapConfig = AppConfig.mapConfig;

  constructor(private globalMap: GlobalMapService) { }

  ngOnInit() {
    this.initMainMap();
  }

  // 设置地图服务代理规则
  async initMainMap() {
    let [Map, MapView, Basemap, TileLayer, urlUtils] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Basemap',
      'esri/layers/TileLayer',
      'esri/core/urlUtils'
    ], { url: this.mapConfig.api });

    // 增加地图服务代理规则
    // urlUtils.addProxyRule({
    //   urlPrefix: this.mapConfig.host,
    //   proxyUrl: this.mapConfig.proxy
    // });

    let whBasemap;
    const whBaseLayer = new TileLayer({
      url: 'http://192.168.5.88:6080/arcgis/rest/services/WH/WHGLQ_38/MapServer'
    });
    whBasemap = new Basemap({
      baseLayers: [whBaseLayer],
      title: 'WuHanBasemap',
      id: 'whdt'
    });

    const map = new Map({
      basemap: whBasemap ? whBasemap : null
    });

    this.mapView = new MapView({
      container: this.mapElement.nativeElement,
      map: map,
      // center: [-80, 35],
      // spatialReference: {
      //   wkid: this.mapConfig.wkid
      // },
      ui: {
        components: []
      }
    });

    // All resources in the MapView and the map have loaded.
    // Now execute additional processes
    this.mapView.when(() => {
      // 执行地图加载完成逻辑
    });
  }

  ngOnDestroy() {
  }
}

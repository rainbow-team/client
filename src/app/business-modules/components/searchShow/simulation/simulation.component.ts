import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { NzMessageService } from 'ng-zorro-antd';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UnitAddressService } from 'src/app/services/unit/unitaddress.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

declare var MapConfig: any;

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  unitType: any = 'unit_service'; //默认为核设施营运单位
  actionType: any = 'view'; //默认为查看模式
  isMarkerVisible: boolean;
  isMarkerLoading: boolean;

  isDeleteConfirmVisible: boolean;
  isDeleteConfirmLoading: boolean;

  isProvinceMap: any = false;

  selectedUnit: any = {}; //选中查看的单位
  marker: any = {};
  unit_services: any = [];
  unit_umines: any = [];

  unit_regions: any = [];

  // unitId: any;
  markerType: any = '';
  geo: any;
  myChartProe: any;
  province: any = '';

  fileList = [];
  canManage: any = false;
  umineId: any;
  serviceId: any;
  constructor(
    private msg: NzMessageService,
    private http: HttpClient,
    private router: Router,
    private serviceDepartService: ServiceDepartService,
    private umineService: UmineService,
    private unitAddressService: UnitAddressService,
    private attachmentSercice: AttachmentSercice,
    private activatedRoute: ActivatedRoute,
    private utilitiesSercice: UtilitiesSercice
  ) {}

  ngOnInit() {
    this.canManage = this.utilitiesSercice.checkPermission(
      'searchShow:simulation:manage'
    );
    this.province = this.activatedRoute.snapshot.queryParams['id'];
    if (this.province) {
      this.InitProvinceMap();
    } else {
      this.LoadChinaMap();
    }
    this.umineService.getAllUmine().subscribe(res => {
      this.unit_umines = res.msg;
    });

    this.serviceDepartService.getAllDepartService().subscribe(res1 => {
      this.unit_services = res1.msg;
    });
  }
  // handlePreview = (file: UploadFile) => {
  //   this.previewImage = file.url || file.thumbUrl;
  //   this.previewVisible = true;
  // };
  private InitProvinceMap() {
    this.unitAddressService
      .getUnitAddressListByProvince(this.province)
      .subscribe(res => {
        let points = [];
        res.msg.forEach(element => {
          points.push({
            id: element.id,
            name: element.name,
            value: '',
            unitId: element.unitId,
            picId: element.picId,
            unitType: element.unitType,
            coord: element.geo.toString().split(',')
          });
        });
        this.LoadProvinceMap(this.province, points);
      });
  }

  LoadChinaMap() {
    this.isProvinceMap = false;
    this.http.get('./assets/json/china.json').subscribe(mapData => {
      let chianMap = echarts.init(document.getElementById('mapChina'));
      echarts.registerMap('china', mapData);
      this.unitAddressService.getChinaMapData().subscribe(result => {
        let mydata = result.msg;
        let mapOption = {
          backgroundColor: '#FFFFFF',
          title: {
            text: '',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item'
          },

          //左侧小导航图标
          visualMap: {
            show: true,
            x: 'left',
            y: 'center',
            splitList: [
              { start: 25, end: 50 },
              { start: 15, end: 25 },
              { start: 8, end: 15 },
              { start: 4, end: 8 },
              { start: 2, end: 4 },
              { start: 0, end: 2 }
            ],
            color: [
              '#5475f5',
              '#9feaa5',
              '#85daef',
              '#74e2ca',
              '#e6ac53',
              '#9fb5ea'
            ]
          },

          //配置属性
          series: [
            {
              name: '数据',
              type: 'map',
              mapType: 'china',
              zoom: 1.2,
              roam: true,
              label: {
                normal: {
                  show: true //省份名称
                },
                emphasis: {
                  show: false
                }
              },
              data: mydata //数据
            }
          ]
        };
        chianMap.setOption(mapOption);
      });

      chianMap.on('click', result => {
        this.province = result.name;
        this.InitProvinceMap();
      });
    });
  }

  LoadProvinceMap(province: string, markpoints: any) {
    let that = this;
    this.isProvinceMap = true;
    let symbolBlue =
      'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphOGU3Nzk1ZS1lMzEyLTBmNGItODljZC0wNjI4MGZhMWFjNjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODEyQUQ2M0JDQUQ1MTFFOUI5MDA5OTAwNEVDNTNENjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODEyQUQ2M0FDQUQ1MTFFOUI5MDA5OTAwNEVDNTNENjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE4ZTc3OTVlLWUzMTItMGY0Yi04OWNkLTA2MjgwZmExYWM2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDphOGU3Nzk1ZS1lMzEyLTBmNGItODljZC0wNjI4MGZhMWFjNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ANQLwAAACFklEQVR42qxW3U0CQRBeLryLz5pwVsBZAUcFQAfYAbxrPGIBSgVIBWAFQgVCBUJiAVwFOEO+S5ZlZm8PnWRyl53db352frZ2OByMRrdPJqZPl7hH3CBOIFoT74kXxB8/L2arYdQkBQB+Jh6YMHonHkuKzhQQOFs7hcVViD16ICULezFywNni+QXgBmfmwDj3AIKp+R/qF54cFSDmXxdaroXrnu+kCFHmAc+JJ8Qd4mtwB2u5J1zZ0YObxwNb/61s3HAmkSVrJY0TZFBLOX9XR45LtCNOCXxvpW6zkLH7rJjWU9RFU8Do+RSw5XsCYHdf3ZqgdbZ8hD0s+5QU8B3EgmBFB5f4HyoFN4DMYO9K2HMVKa4tbSs82dK1/qV7SiLloF3yLY+CRDlzUsk7YT12Ltt4EsFOzTN5pLmmhMsXykSQryMFoI3sKYowVwowQ0bx3rZkQISeLlXiFBmyRchGqN4J/mOrPb8rIVoUvWipWJARyNjXdOhshtkhpXpatywQFWA+9N1hgsqeK7FnenPb9VapCelS05J93Epid+AMA9pwGgB+gnUyMj13UYWOsRdHZqAXwdafKUDfH/8BfOzODu3Zsi7pQeJwIvBE6kVGacV5BfBce0OJCuBmlfsYamNV84CVcPHNAsBn2Bv+dKxwH2LcgzxwimujvDhKi65UAV4VrpKN/eLwUWmIrFA1rNbeCwFn+hVgAMmExuRl5WIYAAAAAElFTkSuQmCC';
    let symbolOrange =
      'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphOGU3Nzk1ZS1lMzEyLTBmNGItODljZC0wNjI4MGZhMWFjNjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODEyQUQ2MzdDQUQ1MTFFOUI5MDA5OTAwNEVDNTNENjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODEyQUQ2MzZDQUQ1MTFFOUI5MDA5OTAwNEVDNTNENjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmE4ZTc3OTVlLWUzMTItMGY0Yi04OWNkLTA2MjgwZmExYWM2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDphOGU3Nzk1ZS1lMzEyLTBmNGItODljZC0wNjI4MGZhMWFjNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4vBAGWAAAB9klEQVR42qxW0XHCMAw1Pv6bLlDSCcgGDRNAv/jNCNmAdIK2E1D+ylfpBmECkglINkgmoDKV70zwc5wD3engIkvPlvQsj06nkxDbiQASks5JF6QBacTfC9KGdEf6K5Z1hQKMAIAKvCJNhJ98kb7ZgKRlsdrtYUBwwWsPtNFFH4Ba+MPpGCrB2Xc7SRCAMqzF7bI2TyKNnL+L+4kCCU2AzJGWlvSTdEb6yDrjb60jXdl/F30/KaQjWFhy6gpgj7iDpsD+POausUlNGnO/6zRODFvFwDH/2si0kA6AhIMHXHx1ypz1yN8CXoNa+gwQWgx7DqQkBQEStgkiWM4+XXmQ4Gh5h3hI5sZ/W50iCRxNyk8dABHwuSBaDS45s9jC0Qhma17ZJToaSJcrlZHFXkgQ4MXYUQYI1WoyEWsD9rnagIto6q5/NY6fGKmrmGCNsXZuI5qeBznYQXa+592S8ey4bvVlHUtjYCDnA+BKyLYV8P3oTrQKcMJW1LhnXU27D7vzIPW4hmOP4BexZKeo+zvMApX7HRqZ6R0AUtdMLjy6xiXqZVH4PFuKnjvIPpyWdeTzbNFXcTsgeItmAgIoBtYj7aamD0CTb+MRfEPBEVGdADpVpTPvPS9A6UmuEgTvJZ0PQGMBKTsvDihjzyJqkJ0xpxsfxz8BBgBjKZKiikY8ngAAAABJRU5ErkJggg==';
    markpoints.forEach(element => {
      element.symbolSize = [24, 32];
      if (element.unitType === '0') {
        element.symbol = symbolBlue;
      }
      if (element.unitType === '1') {
        element.symbol = symbolOrange;
      }
    });
    this.http.get('./assets/json/' + province + '.json').subscribe(Citymap => {
      echarts.registerMap(province, Citymap);
      this.myChartProe = echarts.init(document.getElementById('mapProvince'));
      this.myChartProe.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function loadData(result) {
            //回调函数，参数params具体格式参加官方API
            return result.name;
          }
        },
        dataRange: {
          min: 0,
          max: 50,
          text: ['高', '低'],
          realtime: false,
          calculable: false,
          splitNumber: 0,
          itemWidth: 10,
          show: false,
          itemHeight: 60,
          color: ['lightskyblue', '#f2f2f2']
        },
        title: {
          text: province + '数据总览',
          //subtext:'',
          x: 'center',
          y: 'top',
          textAlign: 'left'
        },
        series: [
          {
            type: 'map',
            map: province,
            scaleLimit: { min: 0.5, max: 4 },
            roam: true,
            mapLocation: {
              y: 60
            },
            itemSytle: {
              emphasis: { label: { show: false } }
            },
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            markPoint: {
              data: markpoints
            }
          }
        ]
      });

      this.myChartProe.on('click', function(params) {
        if (params.componentType === 'markPoint') {
          that.marker = params.data;
          let unitId = params.data.unitId;
          let unitType = params.data.unitType;
          that.markerType = unitType;
          // 点击到了 markPoint 上,编辑热区
          if (that.actionType === 'edit') {
            that.router.navigate(['/searchShow/simulation/unit-editor'], {
              queryParams: {
                mid: params.data.id,
                uid: params.data.unitId,
                province: that.province,
                unitType: unitType
              }
            });
            // that.showEditorDialog(unitType, unitId);
          }
          // 点击到了 markPoint 上,查看详情
          if (that.actionType === 'view') {
            that.router.navigate(['/searchShow/simulation/unit-show'], {
              queryParams: { id: params.data.id, province: that.province }
            });
          }

          if (that.actionType === 'mark') {
            that.isMarkerVisible = true;
            that.attachmentSercice
              .getFileListById(params.data.id)
              .subscribe(res1 => {
                if (res1.msg.length > 0) {
                  res1.msg.forEach(element => {
                    that.fileList = [];
                    that.fileList.push({
                      response: {
                        msg: element.fileinfoId
                      },
                      name: element.fileinfoClientFileName
                    });
                  });
                }
              });
            // that.unitId = params.data.unitId;
            // that.unitType = params.data.unitType;
            // that.geo = params.data.geo;
          }

          if (that.actionType === 'delete') {
            that.isDeleteConfirmVisible = true;
          }

          // alert('markpoint clicked!\n' + params.toString());
        } else if (params.componentType === 'series') {
          if (params.seriesType === 'graph') {
            if (params.dataType === 'edge') {
              // 点击到了 graph 的 edge（边）上。
            } else {
              // 点击到了 graph 的 node（节点）上。
            }
          }
        }
      });

      this.myChartProe.getZr().on('click', params => {
        if (this.actionType === 'mark') {
          this.marker = {};
          this.fileList = [];
          this.isMarkerVisible = true;
          let pointInPixel = [params.offsetX, params.offsetY];
          if (this.myChartProe.containPixel({ seriesIndex: 0 }, pointInPixel)) {
            this.geo = this.myChartProe.convertFromPixel(
              { seriesIndex: 0 },
              pointInPixel
            );
          }
        }
      });
    });
  }

  markerOk(): void {
    if (!this.FormValidation()) {
      return;
    }
    this.isMarkerLoading = true;
    // let unit: any = {};
    // unit.unitId = this.unitId; //用户选择的单位ID
    if (this.unitType === 'unit_umine') {
      this.marker.unitType = '1';
      this.marker.unitId = this.umineId;
      this.marker.name = this.unit_umines.find(
        obj => obj.id === this.marker.unitId
      ).name;
    } else {
      this.marker.unitType = '0';
      this.marker.unitId = this.serviceId;
      this.marker.name = this.unit_services.find(
        obj => obj.id === this.marker.unitId
      ).name;
    }
    this.marker.geo = this.geo.toString();
    this.marker.province = this.province;

    if (this.fileList.length > 0) {
      this.marker.picId = this.fileList[0].response.msg;
      this.marker.attachmentList = [];
      this.marker.attachmentList.push({
        fileinfoId: this.fileList[0].response.msg
      });
    }

    this.unitAddressService
      .saveOrUpdateUnitAddress(this.marker)
      .subscribe(res => {
        this.isMarkerLoading = false;
        this.isMarkerVisible = false;

        if (res.code === 200) {
          this.msg.create('success', this.marker.id ? '修改成功' : '添加成功');
          this.InitProvinceMap();
        } else {
          this.msg.create('error', this.marker.id ? '修改失败' : '添加失败');
        }
        this.marker = {};
      });
  }

  markerCancel(): void {
    this.isMarkerVisible = false;
  }
  deleteOk(): void {
    this.isDeleteConfirmLoading = true;
    this.unitAddressService
      .deleteUnitAddressById(this.marker.id)
      .subscribe(res => {
        this.isDeleteConfirmLoading = false;
        this.isDeleteConfirmVisible = false;
        if (res.code === 200) {
          this.msg.create('success', '删除成功');
          this.InitProvinceMap();
        } else {
          this.msg.create('error', '删除失败');
        }
      });
  }
  deleteCancel(): void {
    this.isDeleteConfirmVisible = false;
  }

  FormValidation() {
    let isValid = true;
    this.directives.forEach(d => {
      if (!d.validationValue()) {
        isValid = false;
      }
    });
    return isValid;
  }

  getNewGUIDString() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

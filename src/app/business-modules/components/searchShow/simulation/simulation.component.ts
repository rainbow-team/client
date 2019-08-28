import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';

import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UnitAddressService } from 'src/app/services/unit/unitaddress.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';
import { UnithotregionService } from 'src/app/services/unit/unithotregion.service';

import { AttachmentSercice } from 'src/app/services/common/attachment.service';

import * as echarts from 'echarts';
import { Runner } from 'protractor';
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
  isViewerVisible: boolean;
  isEditorVisible: boolean;
  isMarkerLoading: boolean;
  isViewerLoading: boolean;
  isEditorLoading: boolean;

  isSubjectVisible = false;
  subjectTitle: any = '';
  selectedSubject: any = {};

  //图片上传start
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;
  uploadUrl: any = AppConfig.serviceAddress + '/fileInfo/upload';
  downLoadurl: any = AppConfig.serviceAddress + '/fileInfo/download';
  //图片上传end

  // canAddMaker: any = false;
  isProvinceMap: any = false;
  // data: any = [];
  selectedUnit: any = {}; //选中查看的单位
  marker: any = {};
  unit_services: any = [];
  unit_umines: any = [];

  unit_regions: any = [];

  unitImageUrl = '';

  unitId: any;
  markerType: any = '';
  geo: any;
  myChartProe: any;
  province: any = '';

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  unit_subjects: any = [];
  fileList = [];
  selectedRegion: any = {};

  constructor(
    private msg: NzMessageService,
    private http: HttpClient,
    private router: Router,
    private serviceDepartService: ServiceDepartService,
    private umineService: UmineService,
    private unitAddressService: UnitAddressService,
    private facSercice: FacSercice,
    private umineMountainService: UmineMountainService,
    private unithotregionService: UnithotregionService,
    private attachmentSercice: AttachmentSercice,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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
    var that = this;
    this.isProvinceMap = true;
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
              symbol:
                // tslint:disable-next-line:max-line-length
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADNElEQVR42rXUWUgUcRwH8O9/t5k9yj3ce2fd0iLFHioKySwiA6uHjKCgLAqC7BLbyAqJLjqIsIuymyjQLCm6b8rQfOigpyjoJYLMI891t3Vn1/31dzOhVrKH5g9/BoaZ32d+x/wZ+ldZ2VGSPB4sWbyQ/bonXzk0ATHKo57QZPREzCwUplgoAgQjAvxytbb8zCkMsQaCPXteR2MyM/Bxz7aNuZO8EyOE5ehsAjU3g740glrbEQvIYN9loIfAbCkIp4+bqrYIs9Xm4dkqU5JZZUwCuvwGTeHOjASgpraestPHQu1bhl4xABIEMKOBpxEFdXSC/CFQIAx85xkEoohFRQQNBgisG2y4GmqDCNFtAVq7oat+yRIzqKunKS4JmJsFZLrAnHa+HRyQQV95Bh2BAYAFexHtlNEWDEJvHwHBpoPAgwspTlBDC3RV9YnA45payvFIYPnTQaOtUEkOvl2gcIQDDaC27t+Brkgc0Cbz4MlaiF4bxFFu/iwHKl8kAg+fPqMcyQvVgulAWj/g4S/IHPjCgfbBAY1JywENNCPtHJBATd+gq6hLBO49ekI5bg+ERbnAaEv861WeoTP4Z+DW/Sc0ze2CdkkekJoMVYq7v0TykIDIgXiJUqWfJbo8SA+qb96hGbypSSvmg9I44JV+ZtDDgYa/lYgH5z0QPBZoJBtiLe3QDzZFFVevUa7DDdPqBRywQTWST5LLyWc+DGrkU9QeeM2B23EgEJ3HpyirNRSCtg+w8Ea7TBAdJp6pH/rrbxKBC1VXaZbVAVvR4vgUMckOlclYCTlSoT129+Gff2jbnPy1/pe1JzUWPUQrB2yGTtFp/ECt/mz9jbeJwLlLlZSXbIG3uOBjKMO9S//gXdXfjoCm8VmuaOOn5aJVX2N///nVkEfF6fMXKT0zEzOnZjH8xzUQ7Fj5GUr1epE/b64ywKGjJ8hpd2BpwSJlgH37D5LFasWawpXKADt37yOz2Qxf8TplgG3bd5PBYMTWzT5lgC2l22mETo8dO0qVATaVlJJGq8H+vbuUATb4Skg9bBgOlx1QBlhX5CPGGMqPH1EGWLV6fRw4e/qEMkDhmiLqu/5v4AdQSowoNYeAnAAAAABJRU5ErkJggg==',
              symbolSize: [24, 24],
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
            that.showEditorDialog(unitType, unitId);
          }
          // 点击到了 markPoint 上,查看详情
          if (that.actionType === 'view') {
            that.router.navigate(['/searchShow/simulation/unit-show'], {
              queryParams: { id: params.data.id, province: that.province }
            });
            // that.unitImageUrl =
            //   AppConfig.serviceAddress +
            //   '/fileInfo/download?id=' +
            //   params.data.picId;
            // that.showViewerDialog(unitType, unitId);
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
    let unit: any = {};
    unit.unitId = this.unitId; //用户选择的单位ID
    if (this.unitType === 'unit_umine') {
      unit.unitType = '1';
      unit.name = this.unit_umines.find(obj => obj.id === unit.unitId).name;
    } else {
      unit.unitType = '0';
      unit.name = this.unit_services.find(obj => obj.id === unit.unitId).name;
    }
    unit.geo = this.geo.toString();
    unit.province = this.province;

    if (this.fileList.length > 0) {
      unit.picId = this.fileList[0].response.msg;
    }

    this.unitAddressService.saveOrUpdateUnitAddress(unit).subscribe(res => {
      this.isMarkerLoading = false;
      this.isMarkerVisible = false;

      if (res.code === 200) {
        this.msg.create('success', '添加成功');
        this.InitProvinceMap();
      } else {
        this.msg.create('error', '添加失败');
      }
    });
  }

  markerCancel(): void {
    this.isMarkerVisible = false;
  }
  showViewerDialog(unitType: any, unitId: any) {
    this.isViewerVisible = true;
    if (unitType === '0') {
      //营运单位
      this.serviceDepartService.getServiceDepartById(unitId).subscribe(res => {
        this.selectedUnit = res.msg;
      });
    }
    if (unitType === '1') {
      this.umineService.getUmineById(unitId).subscribe(res => {
        this.selectedUnit = res.msg;
      });
    }

    this.unithotregionService
      .getUnitHotRegionListByUnitId(unitId)
      .subscribe(res => {
        this.unit_regions = res.msg;
      });
  }

  viewerOk(): void {
    this.isViewerVisible = false;
  }
  viewerCancel(): void {
    this.isViewerVisible = false;
  }

  showEditorDialog(unitType: any, unitId: any) {
    this.isEditorVisible = true;
    if (unitType === '0') {
      //营运单位
      this.facSercice.getFacListByServiceid(unitId).subscribe(res => {
        this.unit_subjects = res.msg;
        this.initHotRegionTable(res.msg.length, unitId);
      });
    }
    if (unitType === '1') {
      this.umineMountainService
        .getUminemountinaListByUmineId(unitId)
        .subscribe(res => {
          this.unit_subjects = res.msg;
          this.initHotRegionTable(res.msg.length, unitId);
        });
    }
  }
  editorOk(): void {
    this.isEditorLoading = true;
    const regions = [];
    // tslint:disable-next-line:forin
    for (const key in this.editCache) {
      let reg = this.editCache[key].data;
      if (
        reg.subjectId !== '' &&
        reg.hotRegion !== '' &&
        reg.previewUrl !== ''
      ) {
        regions.push(reg);
      }
    }

    this.unithotregionService.insertRegionsBatch(regions).subscribe(res => {
      this.isEditorLoading = false;
      this.isEditorVisible = false;

      if (res.code === 200) {
        this.msg.create('success', '添加成功');
      } else {
        this.msg.create('error', '添加失败');
      }
    });
  }
  editorCancel(): void {
    this.isEditorVisible = false;
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  initHotRegionTable(count: any, unitId: any) {
    this.listOfData = [];
    for (let i = 0; i < count; i++) {
      this.listOfData.push({
        id: this.getNewGUIDString(),
        unitId: unitId,
        subjectId: '',
        hotRegion: '',
        previewUrl: ''
      });
    }
    this.updateEditCache();
  }

  // addRow(): void {
  //   this.listOfData = [
  //     ...this.listOfData,
  //     {
  //       id: this.getNewGUIDString(),
  //       subjectId: '',
  //       hotRegion: '',
  //       previewUrl: ''
  //     }
  //   ];
  // }

  showSubjectDetail(item) {
    this.isSubjectVisible = true;
    this.selectedRegion = item;
    if (this.markerType === '0') {
      this.subjectTitle = '核设施详细信息';
      this.facSercice.getFacById(item.subjectId).subscribe(res => {
        this.selectedSubject = res.msg;
      });
    }
    if (this.markerType === '1') {
      this.subjectTitle = '铀矿山详细信息';
      this.umineMountainService
        .getUmineMountainById(item.subjectId)
        .subscribe(res => {
          this.selectedSubject = res.msg;
        });
    }
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
    // your favourite guid generation function could go here
    // ex: http://stackoverflow.com/a/8809472/188246
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

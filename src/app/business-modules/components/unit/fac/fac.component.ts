import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class FacComponent implements OnInit {
  @Input() isSearchShow = '0';

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];
  ServiceDepartList: any = [];

  name: any = '';
  code: any = '';
  serviceDepart: any = '';
  build_start_year: any = '';
  build_end_year: any = '';
  supervisionCategoryIds: any = [];
  typeIds: any = [];
  statusIds: any = [];
  reviewStatusIds: any = [];
  permitSituationIds: any = [];
  is_earthquake: any = '';
  is_flood: any = '';

  selectId: any = '';
  canManage: any = false;

  checked: any = false;

  uploadUrl: any = AppConfig.serviceAddress + '/fac/importData';
  pageHeight: any = 560;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private facSercice: FacSercice,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private serviceDepartService: ServiceDepartService,
    private utilitiesSercice: UtilitiesSercice
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);
    this.canManage = this.utilitiesSercice.checkPermission('fac:manage');

    this.serviceDepartService.getAllDepartService().subscribe(res => {
      if (res.code == 200) {
        this.ServiceDepartList = [];
        res.msg.forEach(element => {
          this.ServiceDepartList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    });

    if (this.isSearchShow != "0") {
      this.pageHeight = 590;
    }

    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }

    if (this.code) {
      option.conditions.push({ key: 'code', value: this.code });
    }

    if (this.serviceDepart) {
      option.conditions.push({
        key: 'serviceDepart',
        value: this.serviceDepart
      });
    }

    if (this.build_start_year) {
      option.conditions.push({
        key: 'build_start_year',
        value: this.build_start_year
      });
    }

    if (this.build_end_year) {
      option.conditions.push({
        key: 'build_end_year',
        value: this.build_end_year
      });
    }

    if (this.supervisionCategoryIds && this.supervisionCategoryIds.length > 0) {
      option.conditions.push({
        key: 'supervisionCategoryIds',
        value: [this.supervisionCategoryIds]
      });
    }

    if (this.typeIds && this.typeIds.length > 0) {
      option.conditions.push({ key: 'typeIds', value: [this.typeIds] });
    }

    if (this.statusIds && this.statusIds.length > 0) {
      option.conditions.push({ key: 'statusIds', value: [this.statusIds] });
    }

    if (this.reviewStatusIds && this.reviewStatusIds.length > 0) {
      option.conditions.push({
        key: 'reviewStatusIds',
        value: [this.reviewStatusIds]
      });
    }

    if (this.permitSituationIds && this.permitSituationIds.length > 0) {
      option.conditions.push({
        key: 'permitSituationIds',
        value: [this.permitSituationIds]
      });
    }

    if (this.is_earthquake) {
      option.conditions.push({
        key: 'is_earthquake',
        value: this.is_earthquake
      });
    }

    if (this.is_flood) {
      option.conditions.push({ key: 'is_flood', value: this.is_flood });
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }

    this.facSercice.getFacList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.name = '';
    this.code = '';
    this.serviceDepart = '';
    this.build_start_year = '';
    this.build_end_year = '';
    this.supervisionCategoryIds = [];
    this.typeIds = [];
    this.statusIds = [];
    this.reviewStatusIds = [];
    this.permitSituationIds = [];
    this.is_earthquake = '';
    this.is_flood = '';
    this.selectId = '';
  }

  add() {
    this.router.navigate(['/unit/fac/add']);
  }

  // childmanage(item) {
  //   this.router.navigate(['/unit/fac/childmanage'], { queryParams: { id: item.id } });
  // }

  show(item) {
    if (this.isSearchShow == '0') {
      this.router.navigate(['/unit/fac/add'], {
        queryParams: { id: item.id, isShow: true }
      });
    } else {
      this.router.navigate(['/searchShow/integratedAuery/facSearch'], {
        queryParams: { id: item.id }
      });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/unit/fac/add'], {
        queryParams: { id: this.selectId, isShow: false }
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.facSercice.deleteFacById(this.selectId).subscribe(res => {
        if (res.code == 200) {
          this.msg.create('success', res.msg);
          this.search();
        } else if (res.code == 500) {
          this.msg.create('warning', res.msg);
        } else {
          this.msg.create('error', res.msg);
        }
      });
    } else {
      this.msg.create('warning', '请选择删除项');
    }
  }

  selectItem(data) {
    this.selectId = data.id;
  }

  pageIndexChange(num) {
    this.pageIndex = num;
    this.search();
  }

  pageSizeChange(num) {
    this.pageSize = num;
    this.pageIndex = 1;
    this.search();
  }

  exportData() {
    let url =
      AppConfig.serviceAddress +
      '/fac/exportFac?name=' +
      this.name +
      '&code=' +
      this.code +
      '&serviceDepart=' +
      this.serviceDepart +
      '&build_start_year=' +
      encodeURIComponent(this.build_start_year) +
      '&build_end_year=' +
      encodeURIComponent(this.build_end_year) +
      '&supervisionCategoryIds=' +
      this.supervisionCategoryIds +
      '&typeIds=' +
      this.typeIds +
      '&statusIds=' +
      this.statusIds +
      '&reviewStatusIds=' +
      this.reviewStatusIds +
      '&permitSituationIds=' +
      this.permitSituationIds +
      '&is_earthquake=' +
      this.is_earthquake +
      '&is_flood=' +
      this.is_flood;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }
}

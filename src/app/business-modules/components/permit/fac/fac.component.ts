import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Permit_FacSercice } from 'src/app/services/permit/permit_fac.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-permit-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class PermitFacComponent implements OnInit {
  @Input() facId: any = '';

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = '';
  facName: any = '';
  permitStageIds: any = '';
  permit_date: any = [];

  selectId: any = '';
  uploadUrl: any = AppConfig.serviceAddress + '/facpermit/importData';
  canManage:any=false;
  pageHeight:any;
  checked: any = false;
  
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private permit_FacSercice: Permit_FacSercice,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private utilitiesSercice: UtilitiesSercice
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);

    this.canManage = this.utilitiesSercice.checkPermission('permit:fac:manage');

    this.pageHeight = this.facId ? 505 : 395;
    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    if (this.serviceDepartName) {
      option.conditions.push({
        key: 'serviceDepartName',
        value: this.serviceDepartName
      });
    }
    if (this.facName) {
      option.conditions.push({ key: 'facName', value: this.facName });
    }
    if (this.permitStageIds) {
      option.conditions.push({
        key: 'permitStageIds',
        value: [this.permitStageIds]
      });
    }
    if (this.permit_date && this.permit_date.length > 0) {
      if (this.permit_date[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.permit_date[0]
        });
      }

      if (this.permit_date[1]) {
        option.conditions.push({ key: 'end_date', value: this.permit_date[1] });
      }
    }

    if (this.facId) {
      option.conditions.push({ key: 'facId', value: this.facId });
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }

    this.permit_FacSercice.getFacPermitList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.serviceDepartName = '';
    this.facName = '';
    this.permitStageIds = '';
    this.permit_date = [];
    this.selectId = '';
  }

  add() {
    this.router.navigate(['/permit/fac/add']);
  }

  show(item) {
    if (this.facId) {
      this.router.navigate(['/searchShow/integratedAuery/permitfacAdd'], {
        queryParams: { id: item.id, isShow: true, facId: this.facId }
      });
    } else {
      this.router.navigate(['/permit/fac/add'], {
        queryParams: { id: item.id, isShow: true }
      });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/fac/add'], {
        queryParams: { id: this.selectId, isShow: false }
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.permit_FacSercice
        .deleteFacPermitByIds([this.selectId])
        .subscribe(res => {
          if (res.code == 200) {
            this.msg.create('success', res.msg);
            this.search();
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

  exportFacPermit() {

    let start_date = '',
      end_date = '';
    if (this.permit_date && this.permit_date.length > 0) {
      if (this.permit_date[0]) {
        start_date = this.permit_date[0];
      }

      if (this.permit_date[1]) {
        end_date = this.permit_date[1];
      }
    }
    
    let url =
      AppConfig.serviceAddress +
      '/facpermit/exportFacPermit?serviceDepartName=' + this.serviceDepartName 
      +'&facName=' +  this.facName +'&permitStageIds=' +  this.permitStageIds
      +'&start_date=' + encodeURIComponent(start_date) +'&end_date=' + encodeURIComponent(end_date);

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }

}

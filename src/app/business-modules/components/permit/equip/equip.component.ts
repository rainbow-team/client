import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipPermitService } from 'src/app/services/permit/equip.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class EquipPermitComponent implements OnInit {
  @Input() equipdepartId: any = '';

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = '';
  equipDepartName: any = '';
  serviceDepartName: any = '';
  facName: any = '';

  typeIds: any = [];
  levelIds: any = [];
  stageIds: any = [];
  permit_date: any = [];

  selectId: any = '';
  uploadUrl: any = AppConfig.serviceAddress + '/equippermit/importData';
  canManage: any = false;
  pageHeight:any;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private equipPermitService: EquipPermitService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private utilitiesSercice: UtilitiesSercice
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);

    this.canManage = this.utilitiesSercice.checkPermission('permit:equip:manage');

    this.pageHeight = this.equipdepartId ? 540 : 430;
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

    if (this.equipDepartName) {
      option.conditions.push({
        key: 'equipDepartName',
        value: this.equipDepartName
      });
    }

    if (this.serviceDepartName) {
      option.conditions.push({
        key: 'serviceDepartName',
        value: this.serviceDepartName
      });
    }

    if (this.facName) {
      option.conditions.push({
        key: 'facName',
        value: this.facName
      });
    }

    if (this.typeIds.length > 0) {
      option.conditions.push({
        key: 'typeIds',
        value: [this.typeIds]
      });
    }
    if (this.levelIds.length > 0) {
      option.conditions.push({
        key: 'levelIds',
        value: [this.levelIds]
      });
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({
        key: 'stageIds',
        value: [this.stageIds]
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

    if (this.equipdepartId) {
      option.conditions.push({
        key: 'equipdepartId',
        value: this.equipdepartId
      });
    }

    this.equipPermitService.getEquipPermitList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.name = '';
    this.equipDepartName = '';
    this.serviceDepartName = '';
    this.facName = '';

    this.typeIds = [];
    this.levelIds = [];
    this.stageIds = [];
    this.permit_date = [];

    this.selectId = '';
  }

  add() {
    this.router.navigate(['/permit/equip/add']);
  }

  show(item) {
    if (this.equipdepartId) {
      this.router.navigate(['/searchShow/integratedAuery/permitequipAdd'], {
        queryParams: {
          id: item.id,
          isShow: true,
          equipdepartId: this.equipdepartId
        }
      });
    } else {
      this.router.navigate(['/permit/equip/add'], {
        queryParams: { id: item.id, isShow: true }
      });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/equip/add'], {
        queryParams: { id: this.selectId, isShow: false }
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.equipPermitService
        .deleteEquipPermitByIds([this.selectId])
        .subscribe(res => {
          if (res.code == 200) {
            this.msg.create('success', '删除成功');
            this.search();
          } else {
            this.msg.create('error', '删除失败');
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

  exportEquipPermit() {

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
      '/equippermit/exportEquipPermit?name=' + this.name 
      +'&equipDepartName=' +  this.equipDepartName +'&serviceDepartName=' +  this.serviceDepartName 
      +'&facName=' +  this.facName
      +'&typeIds=' +  this.typeIds +'&levelIds=' +  this.levelIds +'&stageIds=' +  this.stageIds
      +'&start_date=' + encodeURIComponent(start_date) +'&end_date=' + encodeURIComponent(end_date);

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }

}

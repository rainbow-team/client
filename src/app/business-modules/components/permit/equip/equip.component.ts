import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipPermitService } from 'src/app/services/permit/equip.service';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class EquipPermitComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = '';
  equipDepartName: any = '';
  serviceDepartName: any = '';
  facName:any="";

  typeIds: any = [];
  levelIds: any = [];
  stageIds: any = [];
  permit_date: any = [];

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private equipPermitService: EquipPermitService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

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
        value: this.typeIds
      });
    }
    if (this.levelIds.length > 0) {
      option.conditions.push({
        key: 'levelIds',
        value: this.levelIds
      });
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({
        key: 'stageIds',
        value: this.stageIds
      });
    }

    if (this.permit_date && this.permit_date.length > 0) {
      if (this.permit_date[0]) {
        option.conditions.push({ key: "start_date", value: this.permit_date[0] })
      }

      if (this.permit_date[1]) {
        option.conditions.push({ key: "end_date", value: this.permit_date[1] })
      }
    }

    this.equipPermitService.getEquipPermitList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.name = '';
    this.equipDepartName="";
    this.serviceDepartName = '';
    this.facName="";

    this.typeIds = [];
    this.levelIds = [];
    this.stageIds = [];
    this.permit_date = [];
  }

  add() {
    this.router.navigate(['/permit/equip/add']);
  }

  show(item, flag) {
    this.router.navigate(['/permit/equip/add'], {
      queryParams: { id: item.id, flag: flag }
    });
  }

  delete(item) {
    this.equipPermitService.deleteEquipPermitByIds([item.id]).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else {
        this.msg.create('error', '删除失败');
      }
    });
  }
}

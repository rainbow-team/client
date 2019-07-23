import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipService } from 'src/app/services/permit/equip.service';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class EquipComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = '';
  name: any = '';
  equipDepartName: any = '';
  typeIds: any = [];
  levelIds: any = [];
  stageIds: any = [];
  permissionDate: any = '';

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private equipService: EquipService,
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
    if (this.serviceDepartName) {
      option.conditions.push({
        key: 'serviceDepartName',
        value: this.serviceDepartName
      });
    }
    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }
    if (this.equipDepartName) {
      option.conditions.push({
        key: 'equipDepartName',
        value: this.equipDepartName
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

    if (this.permissionDate) {
      option.conditions.push({
        key: 'permissionDate',
        value: this.permissionDate[0]
      });
    }

    this.equipService.getEquipList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.serviceDepartName = '';
    this.name = '';
    this.equipDepartName = '';
    this.typeIds = [];
    this.levelIds = [];
    this.stageIds = [];
    this.permissionDate = '';
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
    this.equipService.deleteEquipByIds([item.id]).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else {
        this.msg.create('error', '删除失败');
      }
    });
  }
}

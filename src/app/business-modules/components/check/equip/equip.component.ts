import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipCheckService } from 'src/app/services/check/equip.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';

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

  name: any = "";
  equipDepartName: any = "";
  serviceDepartName: any = "";
  facName: any = "";
  typeIds: any = [];
  levelIds: any = [];
  stageIds: any = [];

  constructor(private router: Router,
    private msg: NzMessageService, private equipCheckService: EquipCheckService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService, private facSercice: FacSercice) { }

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
    }

    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }
    if (this.equipDepartName) {
      option.conditions.push({ key: "equipDepartName", value: this.equipDepartName })
    }
    if (this.serviceDepartName) {
      option.conditions.push({ key: "serviceDepartName", value: this.serviceDepartName })
    }
    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }
    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: this.typeIds })
    }
    if (this.levelIds.length > 0) {
      option.conditions.push({ key: "levelIds", value: this.levelIds })
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({ key: "stageIds", value: this.stageIds })
    }

    this.equipCheckService.getEquipList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.equipDepartName = "";
    this.serviceDepartName = "";
    this.facName = "";
    this.typeIds = [];
    this.levelIds = [];
    this.stageIds = [];
  }

  add() {
    this.router.navigate(['/check/equip/add']);
  }

  show(item, flag) {
    this.router.navigate(['/check/equip/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.equipCheckService.deleteEquipById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

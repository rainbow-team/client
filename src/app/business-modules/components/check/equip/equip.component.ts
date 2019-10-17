import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipCheckService } from 'src/app/services/check/equip.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-check-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class EquipComponent implements OnInit {

  @Input() equipdepartId: any = "";

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

  selectId: any = "";
  canManage: any = false;
  pageHeight:any;

  checked: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private equipCheckService: EquipCheckService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService, private facSercice: FacSercice,
    private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.canManage = this.utilitiesSercice.checkPermission('check:equip:manage');

    this.pageHeight = this.equipdepartId ? 535 : 425;
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
      option.conditions.push({ key: "typeIds", value: [this.typeIds] })
    }
    if (this.levelIds.length > 0) {
      option.conditions.push({ key: "levelIds", value: [this.levelIds] })
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({ key: "stageIds", value: [this.stageIds] })
    }

    if (this.equipdepartId) {
      option.conditions.push({ key: "equipdepartId", value: this.equipdepartId })
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }
    
    this.equipCheckService.getEquipCheckList(option).subscribe(
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
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/check/equip/add']);
  }

  show(item) {

    if (this.equipdepartId) {
      this.router.navigate(['/searchShow/integratedAuery/checkequipAdd'], { queryParams: { id: item.id, isShow: true, equipdepartId: this.equipdepartId } });
    } else {
      this.router.navigate(['/check/equip/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/check/equip/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {

      this.equipCheckService.deleteEquipCheckById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else {
          this.msg.create("error", res.msg);
        }
      })

    } else {
      this.msg.create("warning", "请选择删除项");
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

  exportEquipCheck() {

    let url =
      AppConfig.serviceAddress +
      '/equipcheck/exportEquipCheck?name=' + this.name
      + '&equipDepartName=' + this.equipDepartName + '&serviceDepartName=' + this.serviceDepartName
      + '&facName=' + this.facName + '&typeIds=' + this.typeIds
      + '&levelIds=' + this.levelIds + '&stageIds=' + this.stageIds;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }

}

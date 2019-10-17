import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any = 0;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";
  natureIds: any = [];
  leader: any = "";

  selectId: any = "";

  canManage: any = false;

  checked: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private orgSercice: OrgSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("supersivionOrg:manage");


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
    if (this.natureIds && this.natureIds.length > 0) {
      option.conditions.push({ key: "natureIds", value: this.natureIds })
    }
    if (this.leader) {
      option.conditions.push({ key: "leader", value: this.leader })
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }

    this.orgSercice.getOrgList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.natureIds = [];
    this.leader = "";
    this.selectId="";
  }

  add() {
    this.router.navigate(['/supersivion/org/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/org/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/org/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }

  }

  delete() {
    if (this.selectId) {
      this.orgSercice.deleteOrgByIds([this.selectId]).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else {
          this.msg.create("error", res.msg);
        }
      })
    }
    else {
      this.msg.create("warning", "请选择删除项");
    }
  }

  
  selectItem(data) {
    this.selectId = data.id;
  }

  export() {
    var url = AppConfig.serviceAddress + "/sastind/exportSastind?name=" + this.name;
    window.open(url, "_blank");
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

  exportOrg() {

    let url = AppConfig.serviceAddress + "/org/exportOrg?name=" + this.name
        + "&leader=" + this.leader + "&natureIds=" + this.natureIds;


    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");

  }
}

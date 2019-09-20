import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { BreakCheckerSercice } from 'src/app/services/supervision/breakchecker.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-breakchecker',
  templateUrl: './breakchecker.component.html',
  styleUrls: ['./breakchecker.component.scss']
})
export class BreakcheckerComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  name: any = "";
  checkMethodIds: any = [];
  checkLevelIds: any = [];
  employ_depart: any = "";
  valid_date: any = [];
  cert_number: any = "";

  selectId: any = "";

  canManage: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private breakCheckerSercice: BreakCheckerSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("breakchecker:manage");

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
    if (this.checkMethodIds.length > 0) {
      option.conditions.push({ key: "checkMethodIds", value: [this.checkMethodIds] })
    }
    if (this.checkLevelIds.length > 0) {
      option.conditions.push({ key: "checkLevelIds", value: [this.checkLevelIds] })
    }
    if (this.employ_depart) {
      option.conditions.push({ key: "employ_depart", value: this.employ_depart })
    }
    if (this.valid_date && this.valid_date.length > 0) {
      if (this.valid_date[0]) {
        option.conditions.push({ key: "start_date", value: this.valid_date[0] })
      }

      if (this.valid_date[1]) {
        option.conditions.push({ key: "end_date", value: this.valid_date[1] })
      }
    }
    if (this.cert_number) {
      option.conditions.push({ key: "cert_number", value: this.cert_number })
    }

    this.breakCheckerSercice.getBreakCheckerList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.checkMethodIds = [];
    this.checkLevelIds = [];
    this.employ_depart = "";
    this.valid_date = [];
    this.cert_number = "";
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/supersivion/breakchecker/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/breakchecker/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/breakchecker/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {
      this.breakCheckerSercice.deleteBreakCheckerByIds([this.selectId]).subscribe((res) => {

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

  exportBreakChecker() {

    let start_date = "", end_date = "";
    if (this.valid_date && this.valid_date.length > 0) {
        if (this.valid_date[0]) {
            start_date = this.valid_date[0];
        }

        if (this.valid_date[1]) {
            end_date = this.valid_date[1];
        }
    }

    let url = AppConfig.serviceAddress + "/breakchecker/exportBreakChecker?name=" + this.name
        +  "&employ_depart=" + this.employ_depart + "&checkMethodIds=" + this.checkMethodIds
        +  "&checkLevelIds=" + this.checkLevelIds
        +  "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date)
        +  "&cert_number=" + this.cert_number;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");
  }
}

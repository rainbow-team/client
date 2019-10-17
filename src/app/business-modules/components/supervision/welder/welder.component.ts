import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { WelderSercice } from 'src/app/services/supervision/welder.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-welder',
  templateUrl: './welder.component.html',
  styleUrls: ['./welder.component.scss']
})
export class WelderComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  name: any = "";
  employ_depart: any = "";
  exam_project: any = "";
  expire_date: any = [];

  selectId:any="";

  canManage: any = false;

  checked: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private welderSercice: WelderSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("welder:manage");

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
    if (this.employ_depart) {
      option.conditions.push({ key: "employ_depart", value: this.employ_depart })
    }
    if (this.exam_project) {
      option.conditions.push({ key: "exam_project", value: this.exam_project })
    }
    if (this.expire_date && this.expire_date.length > 0) {
      if (this.expire_date[0]) {
        option.conditions.push({ key: "start_date", value: this.expire_date[0] })
      }

      if (this.expire_date[1]) {
        option.conditions.push({ key: "end_date", value: this.expire_date[1] })
      }
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }
    
    this.welderSercice.getWelderList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.employ_depart = "";
    this.exam_project = "";
    this.expire_date = [];
    this.selectId="";
  }

  add() {
    this.router.navigate(['/supersivion/welder/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/welder/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/welder/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.welderSercice.deleteWelderByIds([this.selectId]).subscribe((res) => {

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

  exportWelder() {

    let start_date = "", end_date = "";
    if (this.expire_date && this.expire_date.length > 0) {
        if (this.expire_date[0]) {
            start_date = this.expire_date[0];
        }

        if (this.expire_date[1]) {
            end_date = this.expire_date[1];
        }
    }

    let url = AppConfig.serviceAddress + "/welder/exportWelder?name=" + this.name
        +  "&employ_depart=" + this.employ_depart + "&exam_project=" + this.exam_project
        +  "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date)

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");
  }
}

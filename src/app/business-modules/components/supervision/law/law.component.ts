import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { LawSercice } from 'src/app/services/supervision/law.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.scss']
})
export class LawComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  code: any = "";
  name: any = "";
  fb_date: any = [];

  selectId: any = "";

  canManage: any = false;

  checked: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private lawSercice: LawSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    
    this.canManage = this.utilitiesSercice.checkPermission("law:manage");

    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.code) {
      option.conditions.push({ key: "code", value: this.code })
    }
    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }

    if (this.fb_date && this.fb_date.length > 0) {
      if (this.fb_date[0]) {
        option.conditions.push({ key: "startTime", value: this.fb_date[0] })
      }

      if (this.fb_date[1]) {
        option.conditions.push({ key: "endTime", value: this.fb_date[1] })
      }
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
  }


    this.lawSercice.getLawList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.code = "";
    this.name = "";
    this.fb_date = [];
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/supersivion/law/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/law/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/law/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }

  }

  delete() {
    if (this.selectId) {

      this.lawSercice.deleteLawByIds([this.selectId]).subscribe((res) => {

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

  exportLaw() {

    let start_date = "", end_date = "";
    if (this.fb_date && this.fb_date.length > 0) {
        if (this.fb_date[0]) {
            start_date = this.fb_date[0];
        }

        if (this.fb_date[1]) {
            end_date = this.fb_date[1];
        }
    }

    let url = AppConfig.serviceAddress + "/law/exportLaw?code=" + this.code
        +  "&startTime=" + encodeURIComponent(start_date) + "&endTime=" + encodeURIComponent(end_date)
        + "&name=" + this.name;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");
  }

}

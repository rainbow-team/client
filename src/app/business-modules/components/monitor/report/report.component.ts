import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ReportMonitorSercice } from 'src/app/services/monitor/report.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {


  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  orgName: any = "";

  typeIds: any = [];

  name: any = "";

  report_date = [];

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private reportMonitorSercice: ReportMonitorSercice,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice) { }

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

    if (this.orgName) {
      option.conditions.push({ key: "orgName", value: this.orgName })
    }

    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: [this.typeIds] })
    }

    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }

    if (this.report_date && this.report_date.length > 0) {
      if (this.report_date[0]) {
        option.conditions.push({ key: "start_date", value: this.report_date[0] })
      }

      if (this.report_date[1]) {
        option.conditions.push({ key: "end_date", value: this.report_date[1] })
      }
    }

    this.reportMonitorSercice.getReportMonitorList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.orgName = "";

    this.typeIds = [];

    this.name = "";

    this.report_date = [];

    this.selectId = "";
  }

  add() {
    this.router.navigate(['/monitor/report/add']);
  }

  show(item) {
    this.router.navigate(['/monitor/report/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/monitor/report/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.reportMonitorSercice.deleteReportMonitorById(this.selectId).subscribe((res) => {

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
}


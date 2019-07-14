import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { BreakCheckerSercice } from 'src/app/services/supervision/breakchecker.service';

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

  constructor(private router: Router,
    private msg: NzMessageService, private breakCheckerSercice: BreakCheckerSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice) { }

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
    if (this.checkMethodIds.length > 0) {
      option.conditions.push({ key: "checkMethodIds", value: this.checkMethodIds })
    }
    if (this.checkLevelIds.length > 0) {
      option.conditions.push({ key: "checkLevelIds", value: this.checkLevelIds })
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
  }

  add() {
    this.router.navigate(['/supersivion/breakchecker/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/breakchecker/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.breakCheckerSercice.deleteBreakCheckerByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

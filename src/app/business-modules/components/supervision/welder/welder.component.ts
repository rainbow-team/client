import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { WelderSercice } from 'src/app/services/supervision/welder.service';

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

  constructor(private router: Router,
    private msg: NzMessageService, private welderSercice: WelderSercice, private dictionarySercice: DictionarySercice,
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
  }

  add() {
    this.router.navigate(['/supersivion/welder/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/welder/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.welderSercice.deleteWelderByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}
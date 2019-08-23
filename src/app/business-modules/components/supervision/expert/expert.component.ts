import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ExpertSercice } from 'src/app/services/supervision/expert.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  name: any = "";
  major: any = "";
  startAge:any="";
  endAge:any="";

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private expertSercice: ExpertSercice, private dictionarySercice: DictionarySercice,
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
    if (this.major) {
      option.conditions.push({ key: "major", value: this.major })
    }
    if (this.startAge) {
      option.conditions.push({ key: "startAge", value: this.startAge })
    }
    if (this.endAge) {
      option.conditions.push({ key: "endAge", value: this.endAge })
    }

    this.expertSercice.getExpertList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.major = "";
    this.startAge = "";
    this.endAge = "";
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/supersivion/expert/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/expert/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/expert/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }

  }

  delete() {
    if (this.selectId) {

      this.expertSercice.deleteExpertByIds([this.selectId]).subscribe((res) => {

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
}

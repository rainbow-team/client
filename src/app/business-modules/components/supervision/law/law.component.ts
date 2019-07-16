import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { LawSercice } from 'src/app/services/supervision/law.service';

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

  constructor(private router: Router,
    private msg: NzMessageService, private lawSercice: LawSercice, private dictionarySercice: DictionarySercice,
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
  }

  add() {
    this.router.navigate(['/supersivion/law/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/law/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.lawSercice.deleteLawByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

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


  constructor(private router: Router,
    private msg: NzMessageService, private  expertSercice: ExpertSercice, private dictionarySercice: DictionarySercice,
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
  }

  add() {
    this.router.navigate(['/supersivion/expert/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/expert/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.expertSercice.deleteExpertByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

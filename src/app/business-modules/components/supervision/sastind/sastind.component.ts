import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SastindSercice } from 'src/app/services/supervision/sastind.service';

@Component({
  selector: 'app-sastind',
  templateUrl: './sastind.component.html',
  styleUrls: ['./sastind.component.scss']
})
export class SastindComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private sastindSercice: SastindSercice, private dictionarySercice: DictionarySercice,
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

    this.sastindSercice.getSastindList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
  }

  add() {
    this.router.navigate(['/supersivion/sastind/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/sastind/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.sastindSercice.deleteSastindById([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

  exportSastind() {
    var url = AppConfig.serviceAddress + "/sastind/exportSastind?name=" + this.name;
    window.open(url, "_blank");
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { OperatorLisenceSercice } from 'src/app/services/supervision/operatorlisence.service';

@Component({
  selector: 'app-operatorlisence',
  templateUrl: './operatorlisence.component.html',
  styleUrls: ['./operatorlisence.component.scss']
})
export class OperatorlisenceComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  name: any = "";
  employ_depart: any = "";
  heap_name: any = "";
  lisenceTypeIds: any = [];
  expire_date: any = [];

  constructor(private router: Router,
    private msg: NzMessageService, private operatorLisenceSercice: OperatorLisenceSercice, private dictionarySercice: DictionarySercice,
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
    if (this.heap_name) {
      option.conditions.push({ key: "heap_name", value: this.heap_name })
    }
    if (this.lisenceTypeIds.length > 0) {
      option.conditions.push({ key: "lisenceTypeIds", value: this.lisenceTypeIds })
    }
    if (this.expire_date && this.expire_date.length > 0) {
      if (this.expire_date[0]) {
        option.conditions.push({ key: "start_date", value: this.expire_date[0] })
      }

      if (this.expire_date[1]) {
        option.conditions.push({ key: "end_date", value: this.expire_date[1] })
      }
    }


    this.operatorLisenceSercice.getOperatorLisenceList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.employ_depart = "";
    this.heap_name = "";
    this.lisenceTypeIds = [];
    this.expire_date = [];
  }

  add() {
    this.router.navigate(['/supersivion/operatorlisence/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/operatorlisence/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.operatorLisenceSercice.deleteOperatorLisenceByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

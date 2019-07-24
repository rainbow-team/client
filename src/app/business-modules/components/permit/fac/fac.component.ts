import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Permit_FacSercice } from 'src/app/services/permit/permit_fac.service';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class FacComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  serviceDepartName: any = "";
  facName: any = "";
  permitStageIds: any = "";
  permit_date: any = [];

  constructor(private router: Router,
    private msg: NzMessageService, private permit_FacSercice: Permit_FacSercice, private dictionarySercice: DictionarySercice,
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

    if (this.serviceDepartName) {
      option.conditions.push({ key: "serviceDepartName", value: this.serviceDepartName })
    }
    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }
    if (this.permitStageIds) {
      option.conditions.push({ key: "permitStageIds", value: this.permitStageIds })
    }
    if (this.permit_date && this.permit_date.length > 0) {
      if (this.permit_date[0]) {
        option.conditions.push({ key: "start_date", value: this.permit_date[0] })
      }

      if (this.permit_date[1]) {
        option.conditions.push({ key: "end_date", value: this.permit_date[1] })
      }
    }

    this.permit_FacSercice.getFacPermitList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.serviceDepartName = "";
    this.facName = "";
    this.permitStageIds = "";
    this.permit_date = [];
  }

  add() {
    this.router.navigate(['/permit/fac/add']);
  }

  show(item, flag) {
    this.router.navigate(['/permit/fac/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.permit_FacSercice.deleteFacPermitByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

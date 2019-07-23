import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { FacCheckSercice } from 'src/app/services/check/fac.service';

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

  name: any = "";

  serviceDepartName: any = "";
  facName: any = "";
  typeIds: any = []
  stageIds: any = [];

  constructor(private router: Router,
    private msg: NzMessageService, private facService: FacSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,private serviceDepartService: ServiceDepartService,private facCheckSercice: FacCheckSercice) { }

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
    if (this.typeIds.length>0) {
      option.conditions.push({ key: "typeIds", value: this.typeIds })
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({ key: "stageIds", value: this.stageIds })
    }
    // if (this.permission_date && this.permission_date.length > 0) {
    //   if (this.permission_date[0]) {
    //     option.conditions.push({ key: "start_date", value: this.permission_date[0] })
    //   }

    //   if (this.permission_date[1]) {
    //     option.conditions.push({ key: "end_date", value: this.permission_date[1] })
    //   }
    // }


    this.facCheckSercice.getFacCheckList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.serviceDepartName="";
    this.facName = "";
    this.typeIds = []
    this.stageIds = [];
  }

  add() {
    this.router.navigate(['/check/fac/add']);
  }

  show(item, flag) {
    this.router.navigate(['/check/fac/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.facCheckSercice.deleteFacCheckById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

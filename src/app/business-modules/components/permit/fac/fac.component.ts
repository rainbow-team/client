import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Permit_FacSercice } from 'src/app/services/permit/permit_fac.service';

@Component({
  selector: 'app-permit-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class PermitFacComponent implements OnInit {

  @Input() facId: any = "";

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

  selectId: any = "";

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

    if (this.facId) {
      option.conditions.push({ key: "facId", value: this.facId })
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
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/permit/fac/add']);
  }

  show(item) {
    this.router.navigate(['/permit/fac/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/fac/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {

      this.permit_FacSercice.deleteFacPermitByIds([this.selectId]).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", "删除成功");
          this.search();
        } else {
          this.msg.create("error", "删除失败");
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

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UmineService } from 'src/app/services/unit/umine.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';

@Component({
  selector: 'app-umineplace',
  templateUrl: './umineplace.component.html',
  styleUrls: ['./umineplace.component.scss']
})
export class UmineplaceComponent implements OnInit {

  @Input() isSearchShow = "0";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";
  umineName: any = "";
  build_start_year: any = "";
  build_end_year: any = "";
  levelIds: any = [];
  statusIds: any = [];
  reviewStatusIds: any = [];
  permitSituationIds: any = [];
  have_monitor: any = "";

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private umineSercice: UmineService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private uminePlaceService: UminePlaceService) { }

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

    if (this.umineName) {
      option.conditions.push({ key: "umineName", value: this.umineName })
    }

    if (this.build_start_year) {
      option.conditions.push({ key: "build_start_year", value: this.build_start_year })
    }

    if (this.build_end_year) {
      option.conditions.push({ key: "build_end_year", value: this.build_end_year })
    }

    if (this.levelIds.length > 0) {
      option.conditions.push({ key: "levelIds", value: this.levelIds })
    }

    if (this.statusIds.length > 0) {
      option.conditions.push({ key: "statusIds", value: this.statusIds })
    }

    if (this.reviewStatusIds.length > 0) {
      option.conditions.push({ key: "reviewStatusIds", value: this.reviewStatusIds })
    }

    if (this.permitSituationIds.length > 0) {
      option.conditions.push({ key: "permitSituationIds", value: this.permitSituationIds })
    }

    if (this.have_monitor) {
      option.conditions.push({ key: "have_monitor", value: this.have_monitor })
    }

    this.uminePlaceService.getUminePlaceList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.umineName = "";
    this.build_start_year = "";
    this.build_end_year="";
    this.levelIds = [];
    this.statusIds = [];
    this.reviewStatusIds = [];
    this.permitSituationIds = [];
    this.have_monitor = "";
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/unit/umineplace/add']);
  }

  childmanage(item) {
    this.router.navigate(['/unit/umineplace/childmanage'], { queryParams: { id: item.id } });
  }

  show(item) {

    if (this.isSearchShow == '0') {
      this.router.navigate(['/unit/umineplace/add'], { queryParams: { id: item.id, isShow: true } });
    } else {
      this.router.navigate(['/searchShow/integratedAuery/umineplaceSearch'], { queryParams: { id: item.id} });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/unit/umineplace/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.uminePlaceService.deleteUminePlaceById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", "删除成功");
          this.search();
        } else if (res.code == 500) {
          this.msg.create("warning", res.msg);
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

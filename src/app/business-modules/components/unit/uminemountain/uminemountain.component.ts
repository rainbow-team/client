import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-uminemountain',
  templateUrl: './uminemountain.component.html',
  styleUrls: ['./uminemountain.component.scss']
})
export class UminemountainComponent implements OnInit {

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
  statusIds: any = [];
  recordIds: any = [];
  acceptIds: any = [];

  selectId: any = "";
  canManage: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private umineSercice: UmineService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private umineMountainService: UmineMountainService,
    private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission('uminemountain:manage');

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

    if (this.statusIds.length > 0) {
      option.conditions.push({ key: "statusIds", value: [this.statusIds] })
    }

    if (this.recordIds.length > 0) {
      option.conditions.push({ key: "recordIds", value: [this.recordIds] })
    }
    if (this.acceptIds.length > 0) {
      option.conditions.push({ key: "acceptIds", value: [this.acceptIds] })
    }

    this.umineMountainService.getUmineMountainList(option).subscribe(
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
    this.build_end_year = "";
    this.statusIds = [];
    this.recordIds = [];
    this.acceptIds = []
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/unit/uminemountain/add']);
  }

  // childmanage(item) {
  //   this.router.navigate(['/unit/uminemountain/childmanage'], { queryParams: { id: item.id } });
  // }

  show(item) {

    if (this.isSearchShow == "0") {
      this.router.navigate(['/unit/uminemountain/add'], { queryParams: { id: item.id, isShow: true } });
    } else {
      this.router.navigate(['/searchShow/integratedAuery/uminmountainSearch'], { queryParams: { id: item.id } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/unit/uminemountain/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {
      this.umineMountainService.deleteUmineMountainById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else if (res.code == 500) {
          this.msg.create("warning", res.msg);
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

  pageIndexChange(num) {
    this.pageIndex = num;
    this.search();
  }

  pageSizeChange(num) {
    this.pageSize = num;
    this.pageIndex = 1;
    this.search();
  }

  exportUmineMountain() {

    let url = AppConfig.serviceAddress + "/uminemountain/exportUmineMountain?name=" + this.name
      + "&umineName=" + this.umineName
      + "&build_start_year=" + encodeURIComponent(this.build_start_year)
      + "&build_end_year=" + encodeURIComponent(this.build_end_year)
      + "&statusIds=" + this.statusIds
      + "&recordIds=" + this.recordIds
      + "&acceptIds=" + this.acceptIds


    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");
  }
}

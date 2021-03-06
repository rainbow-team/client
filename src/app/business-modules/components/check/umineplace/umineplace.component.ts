import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineplaceCheckSercice } from 'src/app/services/check/umineplace.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-check-umineplace',
  templateUrl: './umineplace.component.html',
  styleUrls: ['./umineplace.component.scss']
})
export class CheckUmineplaceComponent implements OnInit {

  @Input() umineplaceId: any = "";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  umineName: any = "";
  uminePlaceName: any = "";
  typeIds: any = []
  stageIds: any = [];

  selectId: any = "";
  canManage:any=false;

  pageHeight:any;
  
  checked: any = false;


  constructor(private router: Router,
    private msg: NzMessageService, private umineplaceCheckSercice: UmineplaceCheckSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private umineService: UmineService,
    private uminePlaceService: UminePlaceService,private utilitiesSercice:UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.canManage = this.utilitiesSercice.checkPermission('check:umineplace:manage');

    this.pageHeight = this.umineplaceId ? 505 : 395;
    this.search();

  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.umineName) {
      option.conditions.push({ key: "umineName", value: this.umineName })
    }

    if (this.uminePlaceName) {
      option.conditions.push({ key: "uminePlaceName", value: this.uminePlaceName })
    }
    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: [this.typeIds] })
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({ key: "stageIds", value: [this.stageIds] })
    }

    if (this.umineplaceId) {
      option.conditions.push({ key: "umineplaceId", value: this.umineplaceId })
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }

    this.umineplaceCheckSercice.getUmineplaceCheckList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.umineName = "";
    this.uminePlaceName = "";
    this.typeIds = []
    this.stageIds = [];
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/check/umineplace/add']);
  }

  show(item) {

    if (this.umineplaceId) {
      this.router.navigate(['/searchShow/integratedAuery/checkumineplaceAdd'], { queryParams: { id: item.id, isShow: true, umineplaceId: this.umineplaceId } });

    } else {
      this.router.navigate(['/check/umineplace/add'], { queryParams: { id: item.id, isShow: true } });
    }
    
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/check/umineplace/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {


      this.umineplaceCheckSercice.deleteUmineplaceCheckById(this.selectId).subscribe((res) => {

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

  pageIndexChange(num) {
    this.pageIndex = num;
    this.search();
  }

  pageSizeChange(num) {
    this.pageSize = num;
    this.pageIndex = 1;
    this.search();
  }

  exportUmineplaceCheck() {

    this.umineName = "";
    this.uminePlaceName = "";
    this.typeIds = []
    this.stageIds = [];

    let url =
      AppConfig.serviceAddress +
      '/umineplacecheck/exportUmineplaceCheck?umineName=' + this.umineName
      + '&uminePlaceName=' + this.uminePlaceName + '&typeIds=' + this.typeIds + '&stageIds=' + this.stageIds;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }

}

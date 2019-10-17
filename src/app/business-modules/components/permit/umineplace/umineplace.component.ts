import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineplacePermitService } from 'src/app/services/permit/umineplace.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-permit-umineplace',
  templateUrl: './umineplace.component.html',
  styleUrls: ['./umineplace.component.scss']
})
export class UmineplacePermitComponent implements OnInit {

  @Input() umineplaceId: any = "";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = '';
  uminePlaceName: any = '';
  stageIds: any = [];
  permitDate: any = [];

  selectId: any = "";
  canManage:any=false;
  pageHeight:any;

  checked: any = false;
  
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private umineplacePermitService: UmineplacePermitService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private utilitiesSercice:UtilitiesSercice
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.canManage = this.utilitiesSercice.checkPermission('permit:umineplace:manage');

    this.pageHeight = this.umineplaceId ? 505 : 395;
    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };
    if (this.umineName) {
      option.conditions.push({
        key: 'umineName',
        value: this.umineName
      });
    }
    if (this.uminePlaceName) {
      option.conditions.push({
        key: 'uminePlaceName',
        value: this.uminePlaceName
      });
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({
        key: 'stageIds',
        value: [this.stageIds]
      });
    }
    if (this.permitDate && this.permitDate.length > 0) {
      if (this.permitDate[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.permitDate[0]
        });
      }

      if (this.permitDate[1]) {
        option.conditions.push({
          key: 'end_date',
          value: this.permitDate[1]
        });
      }
    }

    if (this.umineplaceId) {
      option.conditions.push({
        key: 'umineplaceId',
        value: this.umineplaceId
      });
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }

    this.umineplacePermitService
      .getUmineplacePermitList(option)
      .subscribe(data => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      });
  }

  reset() {
    this.umineName = '';
    this.uminePlaceName = '';
    this.stageIds = [];
    this.permitDate = [];
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/permit/umineplace/add']);
  }

  show(item) {

    if (this.umineplaceId) {
      this.router.navigate(['/searchShow/integratedAuery/permitumineplaceAdd'], { queryParams: { id: item.id, isShow: true, umineplaceId: this.umineplaceId } });

    } else {
      this.router.navigate(['/permit/umineplace/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/umineplace/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }


  delete() {
    if (this.selectId) {

      this.umineplacePermitService
        .deleteUmineplacePermitByIds([this.selectId])
        .subscribe(res => {
          if (res.code == 200) {
            this.msg.create('success', '删除成功');
            this.search();
          } else {
            this.msg.create('error', '删除失败');
          }
        });
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

  exportUmineplacePermit() {

    let start_date = '',
      end_date = '';
    if (this.permitDate && this.permitDate.length > 0) {
      if (this.permitDate[0]) {
        start_date = this.permitDate[0];
      }

      if (this.permitDate[1]) {
        end_date = this.permitDate[1];
      }
    }
    
    let url =
      AppConfig.serviceAddress +
      '/umineplacepermit/exportUmineplacePermit?umineName=' + this.umineName 
      +'&uminePlaceName=' +  this.uminePlaceName +'&stageIds=' +  this.stageIds
      +'&start_date=' + encodeURIComponent(start_date) +'&end_date=' + encodeURIComponent(end_date);

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }


}

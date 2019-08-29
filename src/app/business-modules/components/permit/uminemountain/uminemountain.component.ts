import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineMountainPermitService } from 'src/app/services/permit/uminemountain.service';

@Component({
  selector: 'app-permit-uminemountain',
  templateUrl: './uminemountain.component.html',
  styleUrls: ['./uminemountain.component.scss']
})
export class UminemountainPermitComponent implements OnInit {

  @Input() uminemountainId: any = "";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = '';
  umineMountainName: any = '';
  recordtime: any = [];
  acceptDate: any = [];

  selectId: any = "";

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private umineMountainPermitService: UmineMountainPermitService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice
  ) { }

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
    };
    if (this.umineName) {
      option.conditions.push({
        key: 'umineName',
        value: this.umineName
      });
    }
    if (this.umineMountainName) {
      option.conditions.push({
        key: 'umineMountainName',
        value: this.umineMountainName
      });
    }
    if (this.recordtime && this.recordtime.length > 0) {
      if (this.recordtime[0]) {
        option.conditions.push({ key: "record_start_date", value: this.recordtime[0] })
      }

      if (this.recordtime[1]) {
        option.conditions.push({ key: "record_end_date", value: this.recordtime[1] })
      }
    }

    if (this.acceptDate && this.acceptDate.length > 0) {
      if (this.acceptDate[0]) {
        option.conditions.push({ key: "accept_start_date", value: this.acceptDate[0] })
      }

      if (this.acceptDate[1]) {
        option.conditions.push({ key: "accept_end_date", value: this.acceptDate[1] })
      }
    }
    
    if (this.uminemountainId) {
      option.conditions.push({
        key: 'uminemountainId',
        value: this.uminemountainId
      });
    }

    this.umineMountainPermitService
      .getUmineMountainPermitList(option)
      .subscribe(data => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      });
  }

  reset() {
    this.umineName = '';
    this.umineMountainName = '';
    this.recordtime = '';
    this.acceptDate = '';
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/permit/uminemountain/add']);
  }

  show(item) {

    if (this.uminemountainId) {
      this.router.navigate(['/searchShow/integratedAuery/permituminemountainAdd'], { queryParams: { id: item.id, isShow: true, uminemountainId: this.uminemountainId } });
    } else {
      this.router.navigate(['/permit/uminemountain/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/uminemountain/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {

      this.umineMountainPermitService
        .deleteUmineMountainPermitByIds([this.selectId])
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
}

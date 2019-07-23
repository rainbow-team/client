import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineplaceService } from 'src/app/services/permit/umineplace.service';

@Component({
  selector: 'app-umineplace',
  templateUrl: './umineplace.component.html',
  styleUrls: ['./umineplace.component.scss']
})
export class UmineplaceComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = '';
  uminePlaceName: any = '';
  stageIds: any = [];
  permitDate: any = '';

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private umineplaceService: UmineplaceService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice
  ) {}

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
    if (this.uminePlaceName) {
      option.conditions.push({
        key: 'uminePlaceName',
        value: this.uminePlaceName
      });
    }
    if (this.stageIds.length > 0) {
      option.conditions.push({
        key: 'stageIds',
        value: this.stageIds
      });
    }
    if (this.permitDate) {
      option.conditions.push({
        key: 'permitDate',
        value: this.permitDate
      });
    }

    this.umineplaceService.getUmineplaceList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.umineName = '';
    this.uminePlaceName = '';
    this.stageIds = [];
    this.permitDate = '';
  }

  add() {
    this.router.navigate(['/permit/umineplace/add']);
  }

  show(item, flag) {
    this.router.navigate(['/permit/umineplace/add'], {
      queryParams: { id: item.id, flag: flag }
    });
  }

  delete(item) {
    this.umineplaceService.deleteUmineplaceByIds([item.id]).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else {
        this.msg.create('error', '删除失败');
      }
    });
  }
}

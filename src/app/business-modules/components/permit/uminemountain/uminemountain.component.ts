import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UminemountainService } from 'src/app/services/permit/uminemountain.service';

@Component({
  selector: 'app-uminemountain',
  templateUrl: './uminemountain.component.html',
  styleUrls: ['./uminemountain.component.scss']
})
export class UminemountainComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = '';
  umineMountainName: any = '';
  recordtime: any = '';
  acceptDate: any = '';

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private uminemountainService: UminemountainService,
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
    if (this.umineMountainName) {
      option.conditions.push({
        key: 'umineMountainName',
        value: this.umineMountainName
      });
    }
    if (this.recordtime) {
      option.conditions.push({
        key: 'recordtime',
        value: this.recordtime
      });
    }
    if (this.acceptDate) {
      option.conditions.push({
        key: 'acceptDate',
        value: this.acceptDate
      });
    }

    this.uminemountainService.getMountainList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.umineName = '';
    this.umineMountainName = '';
    this.recordtime = '';
    this.acceptDate = '';
  }

  add() {
    this.router.navigate(['/permit/uminemountain/add']);
  }

  show(item, flag) {
    this.router.navigate(['/permit/uminemountain/add'], {
      queryParams: { id: item.id, flag: flag }
    });
  }

  delete(item) {
    this.uminemountainService.deleteMountainByIds([item.id]).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else {
        this.msg.create('error', '删除失败');
      }
    });
  }
}

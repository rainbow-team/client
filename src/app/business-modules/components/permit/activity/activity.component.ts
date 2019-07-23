import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { ActivityPermitService } from 'src/app/services/permit/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityPermitComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = '';
  name: any = '';
  content: any = '';
  activityTypeIds: any = [];
  permissionDate: any = [];

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private activityPermitService: ActivityPermitService,
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
    if (this.serviceDepartName) {
      option.conditions.push({
        key: 'serviceDepartName',
        value: this.serviceDepartName
      });
    }
    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }
    if (this.content) {
      option.conditions.push({ key: 'content', value: this.content });
    }
    if (this.activityTypeIds.length > 0) {
      option.conditions.push({
        key: 'activityTypeIds',
        value: this.activityTypeIds
      });
    }

    if (this.permissionDate && this.permissionDate.length > 0) {
      if (this.permissionDate[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.permissionDate[0]
        });
      }

      if (this.permissionDate[1]) {
        option.conditions.push({
          key: 'end_date',
          value: this.permissionDate[1]
        });
      }
    }

    this.activityPermitService.getActivityPermitList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.name = '';
    this.content = '';
    this.activityTypeIds = [];
    this.permissionDate = [];
    this.serviceDepartName = '';
  }

  add() {
    this.router.navigate(['/permit/activity/add']);
  }

  show(item, flag) {
    this.router.navigate(['/permit/activity/add'], {
      queryParams: { id: item.id, flag: flag }
    });
  }

  delete(item) {
    this.activityPermitService
      .deleteActivityPermitByIds([item.id])
      .subscribe(res => {
        if (res.code == 200) {
          this.msg.create('success', '删除成功');
          this.search();
        } else {
          this.msg.create('error', '删除失败');
        }
      });
  }
}

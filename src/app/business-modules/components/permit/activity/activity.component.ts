import { Component, OnInit, Input } from '@angular/core';
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

  @Input() servicedepartId: any = "";
  @Input() umineId: any = "";

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  departName: any = "";
  facName: any = "";
  name: any = '';

  content: any = '';
  typeIds: any = [];
  permitDate: any = [];

  selectId: any = "";

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private activityPermitService: ActivityPermitService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    if (this.servicedepartId || this.umineId) {
      this.isSearchShow = true;
    }

    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };
    if (this.departName) {
      option.conditions.push({ key: 'departName', value: this.departName });
    }
    if (this.facName) {
      option.conditions.push({ key: 'facName', value: this.facName });
    }

    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }
    if (this.content) {
      option.conditions.push({ key: 'content', value: this.content });
    }
    if (this.typeIds.length > 0) {
      option.conditions.push({ key: 'typeIds', value: [this.typeIds] });
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

    if (this.servicedepartId) {
      option.conditions.push({
        key: 'servicedepartId',
        value: this.servicedepartId
      });
    }

    if (this.umineId) {
      option.conditions.push({
        key: 'umineId',
        value: this.umineId
      });
    }

    this.activityPermitService.getActivityPermitList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {

    this.departName = "";
    this.facName = "";
    this.name = '';
    this.content = '';
    this.typeIds = [];
    this.permitDate = [];
    this.selectId = "";

  }

  add() {
    this.router.navigate(['/permit/activity/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/permitActivityAdd'], { queryParams: { id: item.id, isShow: true, servicedepartId: this.servicedepartId } });
    } else if (this.umineId) {
      this.router.navigate(['/searchShow/integratedAuery/permitActivityAdd'], { queryParams: { id: item.id, isShow: true, umineId: this.umineId } });
    } else {
      this.router.navigate(['/permit/activity/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/activity/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.activityPermitService
        .deleteActivityPermitByIds([this.selectId])
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

}

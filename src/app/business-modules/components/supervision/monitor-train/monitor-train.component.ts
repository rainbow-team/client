import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupervisionSercice } from 'src/app/services/supervision/supervision.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-monitor-train',
  templateUrl: './monitor-train.component.html',
  styleUrls: ['./monitor-train.component.scss']
})
export class MonitorTrainComponent implements OnInit {

  constructor(private router: Router, private supervisionSercice: SupervisionSercice, private msg: NzMessageService) { }

  dataSet: any = [];

  ids: any = [];
  allChecked: any = false;
  indeterminate: any = false;

  totalCount: any = 0;
  pageIndex: any = 1;
  pageSize: any = 10;

  startTime: any;
  endTime: any;
  pxbc: any;
  pxdd: any;

  ngOnInit() {

    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.startTime) {
      option.conditions.push({ key: "startTime", value: this.startTime })
    }
    if (this.endTime) {
      option.conditions.push({ key: "endTime", value: this.endTime })
    }
    if (this.pxbc) {
      option.conditions.push({ key: "pxbc", value: this.pxbc })
    }
    if (this.pxdd) {
      option.conditions.push({ key: "pxdd", value: this.pxdd })
    }

    this.supervisionSercice.getTrainRecordList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.dataSet = this.dataSet.map(r => { return Object.assign(r, { checked: false }) });
        this.totalCount = data.msg.recordCount;
      }
    );
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

  reset() {

    this.startTime = null;
    this.endTime = null;
    this.pxbc = null;
    this.pxdd = null;

  }

  add() {
    this.router.navigate(['/index/supersivion/monitorTrain/add']);
  }

  show(item, flag) {
    this.router.navigate(['/index/supersivion/monitorTrain/add'], { queryParams: { id: item.id, flag: flag } });
  }

  refreshStatus() {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  delete() {

    let checkItems = this.dataSet.filter(value => value.checked);

    if (checkItems != null && checkItems.length == 0) {
      this.msg.create("warning", "请选择删除项");
      return;
    }

    checkItems.forEach(element => {
      this.ids.push(element.id);
    });

    this.supervisionSercice.deleteTrainRecordByIds(this.ids).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupervisionSercice } from 'src/app/services/supervision/supervisor.service';
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

  px_date:any=[];
  batch: any;
  place: any;

  sortName: any;
  sortValue: any;

  sortBatchValue: any;
  sortBeginDateValue: any;
  sortEndDateValue: any;

  ngOnInit() {

    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.px_date && this.px_date.length > 0) {
      if (this.px_date[0]) {
        option.conditions.push({ key: "beginDate", value: this.px_date[0] })
      }

      if (this.px_date[1]) {
        option.conditions.push({ key: "endDate", value: this.px_date[1] })
      }
    }

    if (this.batch) {
      option.conditions.push({ key: "batch", value: this.batch })
    }
    if (this.place) {
      option.conditions.push({ key: "place", value: this.place })
    }

    if (this.sortValue) {

      option.conditions.push({ key: "sortValue", value: this.sortValue })
      option.conditions.push({ key: "sortName", value: this.sortName })

    }

    this.supervisionSercice.getMonitorTrainList(option).subscribe(
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

  sortBatch(sort) {
    this.sortName = "batch";
    this.sortValue = sort;

    this.sortBatchValue = sort;
    this.sortBeginDateValue = null;
    this.sortEndDateValue = null;

    this.search();
  }

  sortBeginDate(sort) {
    this.sortName = "begin_date";
    this.sortValue = sort;

    this.sortBatchValue = null;
    this.sortBeginDateValue = sort;
    this.sortEndDateValue = null;

    this.search();
  }

  sortEndDate(sort) {
    this.sortName = "end_date";
    this.sortValue = sort;

    this.sortBatchValue = null;
    this.sortBeginDateValue = null;
    this.sortEndDateValue = sort;
    
    this.search();
  }


  pageSizeChange(num) {
    this.pageSize = num;
    this.pageIndex = 1;
    this.search();
  }

  reset() {

    this.px_date = [];
    this.batch = null;
    this.place = null;

  }

  add() {
    this.router.navigate(['/supersivion/monitorTrain/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/monitorTrain/add'], { queryParams: { id: item.id, flag: flag } });
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

    this.supervisionSercice.deleteMonitorTrainByIds(this.ids).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })
  }
}

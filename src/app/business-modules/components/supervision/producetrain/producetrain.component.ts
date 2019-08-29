import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ProducetrainSercice } from 'src/app/services/supervision/producetrain.service';

@Component({
  selector: 'app-producetrain',
  templateUrl: './producetrain.component.html',
  styleUrls: ['./producetrain.component.scss']
})
export class ProducetrainComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];


  px_date: any = [];
  batch: any = "";
  place: any = "";

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private producetrainSercice: ProducetrainSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice) { }

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
    }

    if (this.px_date && this.px_date.length > 0) {
      if (this.px_date[0]) {
        option.conditions.push({ key: "begin_date", value: this.px_date[0] })
      }

      if (this.px_date[1]) {
        option.conditions.push({ key: "end_date", value: this.px_date[1] })
      }
    }
    if (this.batch) {
      option.conditions.push({ key: "batch", value: this.batch })
    }
    if (this.place) {
      option.conditions.push({ key: "place", value: this.place })
    }

    this.producetrainSercice.getProduceTrainList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.px_date = [];
    this.batch = "";
    this.place = "'";
    this.selectId="";
  }

  add() {
    this.router.navigate(['/supersivion/producetrain/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/producetrain/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/producetrain/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }

  }

  delete() {

    if (this.selectId) {
      this.producetrainSercice.deleteProduceTrainRecordByIds([this.selectId]).subscribe((res) => {

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
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { SastindSercice } from 'src/app/services/supervision/sastind.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';


@Component({
  selector: 'app-sastind',
  templateUrl: './sastind.component.html',
  styleUrls: ['./sastind.component.scss']
})
export class SastindComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private sastindSercice: SastindSercice, private dictionarySercice: DictionarySercice,
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

    this.sastindSercice.getSastindList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  add() {
    this.router.navigate(['/supersivion/sastind/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/sastind/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if(this.selectId){
      this.router.navigate(['/supersivion/sastind/add'], { queryParams: { id: this.selectId, isShow: false } });
    }else{
      this.msg.create("warning", "请选择修改项");
    }
   
  }
  delete() {

    if (this.selectId) {
      this.sastindSercice.deleteSastindById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", "删除成功");
          this.search();
        } else {
          this.msg.create("error", "删除失败");
        }
      })
    }else{
      this.msg.create("warning", "请选择删除项");
    }

  }

  exportSastind() {
    var url = AppConfig.serviceAddress + "/sastind/exportSastind?name=" + this.name;
    window.open(url, "_blank");
  }


  selectItem(data) {
    this.selectId = data.id;
  }
}

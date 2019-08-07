import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { DailyMonitorSercice } from 'src/app/services/monitor/daily.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {

  @Input() servicedepartId: any = "";
  
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = "";

  facName:any="";

  facStatusTypeIds:any=[];

  fileTypeIds:any=[];

  file_name:any="";
  
  file_date:any=[];

  constructor(private router: Router,
    private msg: NzMessageService, private dailyMonitorSercice: DailyMonitorSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private orgService: OrgSercice,
    private serviceDepartService: ServiceDepartService, private facService: FacSercice) { }

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

    if (this.serviceDepartName) {
      option.conditions.push({ key: "serviceDepartName", value: this.serviceDepartName })
    }

    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }

    if (this.facStatusTypeIds.length > 0) {
      option.conditions.push({ key: "facStatusTypeIds", value: this.facStatusTypeIds })
    }

    if (this.fileTypeIds.length > 0) {
      option.conditions.push({ key: "fileTypeIds", value: this.fileTypeIds })
    }

    if (this.file_name) {
      option.conditions.push({ key: "file_name", value: this.file_name })
    }

    if (this.file_date && this.file_date.length > 0) {
      if (this.file_date[0]) {
        option.conditions.push({ key: "start_date", value: this.file_date[0] })
      }

      if (this.file_date[1]) {
        option.conditions.push({ key: "end_date", value: this.file_date[1] })
      }
    }

    if (this.servicedepartId) {
      option.conditions.push({
        key: 'servicedepartId',
        value: this.servicedepartId
      });
    }

    this.dailyMonitorSercice.getDailyMonitorList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.serviceDepartName = "";
    this.facName="";
    this.facStatusTypeIds=[];
    this.fileTypeIds=[];
    this.file_name="";
    this.file_date=[];
  }

  add() {
    this.router.navigate(['/monitor/daily/add']);
  }

  show(item, flag) {
    this.router.navigate(['/monitor/daily/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.dailyMonitorSercice.deleteDailyMonitorById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

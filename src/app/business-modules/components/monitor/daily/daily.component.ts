import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { DailyMonitorSercice } from 'src/app/services/monitor/daily.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  @Input() servicedepartId: any = '';
  @Input() facId: any = '';

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = '';

  facName: any = '';

  facStatusTypeIds: any = "";

  fileTypeIds: any = "";

  file_name: any = '';

  file_date: any = [];

  selectId: any = '';

  start_date: any = '';
  end_date: any = '';

  canManage: any = false;
  
  checked: any = false;

  uploadUrl: any = AppConfig.serviceAddress + '/dailymonitor/importData';
  pageHeight: any;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private dailyMonitorSercice: DailyMonitorSercice,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private orgService: OrgSercice,
    private serviceDepartService: ServiceDepartService,
    private facService: FacSercice,
    private utilitiesSercice: UtilitiesSercice
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);

    this.canManage = this.utilitiesSercice.checkPermission(
      'monitor:daily:manage'
    );

    if (this.servicedepartId || this.facId) {
      this.isSearchShow = true;
    }

    this.pageHeight = this.isSearchShow ? 540 : 430;
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

    if (this.facName) {
      option.conditions.push({ key: 'facName', value: this.facName });
    }

    if (this.facStatusTypeIds) {
      option.conditions.push({
        key: 'facStatusTypeIds',
        value: [this.facStatusTypeIds]
      });
    }

    if (this.fileTypeIds) {
      option.conditions.push({ key: 'fileTypeIds', value: [this.fileTypeIds] });
    }

    if (this.file_name) {
      option.conditions.push({ key: 'file_name', value: this.file_name });
    }

    if (this.start_date) {
      option.conditions.push({ key: 'start_date', value: this.start_date });
    }

    if (this.end_date) {
      option.conditions.push({ key: 'end_date', value: this.end_date });
    }

    if (this.servicedepartId) {
      option.conditions.push({
        key: 'servicedepartId',
        value: this.servicedepartId
      });
    }

    if (this.facId) {
      option.conditions.push({
        key: 'facId',
        value: this.facId
      });
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }
    
    this.dailyMonitorSercice.getDailyMonitorList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.serviceDepartName = '';
    this.facName = '';
    this.facStatusTypeIds = "";
    this.fileTypeIds = "";
    this.file_name = '';
    this.start_date = '';
    this.end_date = '';
    this.file_date = [];
    this.selectId = '';
  }

  add() {
    this.router.navigate(['/monitor/daily/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/monitordailyAdd'], {
        queryParams: {
          id: item.id,
          isShow: true,
          servicedepartId: this.servicedepartId
        }
      });
    } else if (this.facId) {
      this.router.navigate(['/searchShow/integratedAuery/monitordailyAdd'], {
        queryParams: { id: item.id, isShow: true, facId: this.facId }
      });
    } else {
      this.router.navigate(['/monitor/daily/add'], {
        queryParams: { id: item.id, isShow: true }
      });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/monitor/daily/add'], {
        queryParams: { id: this.selectId, isShow: false }
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.dailyMonitorSercice
        .deleteDailyMonitorById(this.selectId)
        .subscribe(res => {
          if (res.code == 200) {
            this.msg.create('success', res.msg);
            this.search();
          } else {
            this.msg.create('error', res.msg);
          }
        });
    } else {
      this.msg.create('warning', '请选择删除项');
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

  exportDailyMonitor() {

    let url =
      AppConfig.serviceAddress +
      '/dailymonitor/exportDailyMonitor?serviceDepartName=' + this.serviceDepartName
      + '&facName=' + this.facName + '&facStatusTypeIds=' + this.facStatusTypeIds +
      '&fileTypeIds=' + this.fileTypeIds + '&file_name=' + this.file_name +
      '&start_date=' + encodeURIComponent(this.start_date) + '&end_date=' + encodeURIComponent(this.end_date);

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }
}

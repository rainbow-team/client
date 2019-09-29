import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { CheckMonitorSercice } from 'src/app/services/monitor/check.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  @Input() servicedepartId: any = '';
  @Input() umineId: any = '';
  @Input() equipdepartId: any = '';

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = '';

  content: any = '';

  typeIds: any = [];

  check_date: any = [];

  equipDepartIds: any = [];

  equipDepartList: any = [];

  serviceDepartIds: any = [];

  serviceDepartList: any = [];

  facIds: any = [];

  facList: any = [];

  selectId: any = '';

  canManage: any = false;


  uploadUrl: any = AppConfig.serviceAddress + '/checkmonitor/importData';
  canManage: any = false;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private checkMonitorSercice: CheckMonitorSercice,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService,
    private umineService: UmineService,
    private utilitiesSercice: UtilitiesSercice
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);
    this.canManage = this.utilitiesSercice.checkPermission(
      'monitor:check:manage'
    );

    this.canManage = this.utilitiesSercice.checkPermission(
      'monitor:check:manage'
    );

    if (this.servicedepartId || this.umineId || this.equipdepartId) {
      this.isSearchShow = true;
    }

    this.search();

    this.serviceDepartService.getAllDepartService().subscribe(res => {
      if (res.code == 200) {
        this.serviceDepartList = [];
        res.msg.forEach(element => {
          this.serviceDepartList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    });
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }

    if (this.content) {
      option.conditions.push({ key: 'content', value: this.content });
    }

    if (this.typeIds.length > 0) {
      option.conditions.push({ key: 'typeIds', value: [this.typeIds] });
    }

    if (this.check_date && this.check_date.length > 0) {
      if (this.check_date[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.check_date[0]
        });
      }

      if (this.check_date[1]) {
        option.conditions.push({ key: 'end_date', value: this.check_date[1] });
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

    if (this.equipdepartId) {
      option.conditions.push({
        key: 'equipdepartId',
        value: this.equipdepartId
      });
    }

    this.checkMonitorSercice.getCheckMonitorList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.name = '';
    this.content = '';
    this.typeIds = [];
    this.check_date = [];
    //this.groupIds = [];
  }

  add() {
    this.router.navigate(['/monitor/check/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/monitorcheckAdd'], {
        queryParams: {
          id: item.id,
          isShow: true,
          servicedepartId: this.servicedepartId
        }
      });
    } else if (this.umineId) {
      this.router.navigate(['/searchShow/integratedAuery/monitorcheckAdd'], {
        queryParams: { id: item.id, isShow: true, umineId: this.umineId }
      });
    } else if (this.equipdepartId) {
      this.router.navigate(['/searchShow/integratedAuery/monitorcheckAdd'], {
        queryParams: {
          id: item.id,
          isShow: true,
          equipdepartId: this.equipdepartId
        }
      });
    } else {
      this.router.navigate(['/monitor/check/add'], {
        queryParams: { id: item.id, isShow: true }
      });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/monitor/check/add'], {
        queryParams: { id: this.selectId, isShow: false }
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    this.checkMonitorSercice
      .deleteCheckMonitorById(this.selectId)
      .subscribe(res => {
        if (res.code == 200) {
          this.msg.create('success', res.msg);
          this.search();
        } else {
          this.msg.create('error', res.msg);
        }
      });
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

  exportCheckMonitor() {

    let start_date = '',
      end_date = '';
    if (this.check_date && this.check_date.length > 0) {
      if (this.check_date[0]) {
        start_date = this.check_date[0];
      }

      if (this.check_date[1]) {
        end_date = this.check_date[1];
      }
    }


    let url =
      AppConfig.serviceAddress +
      '/checkmonitor/exportCheckMonitor?name=' + this.name
      + '&content=' + this.content + '&typeIds=' + this.typeIds
      + '&start_date=' + encodeURIComponent(start_date) + '&end_date=' + encodeURIComponent(end_date);

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }

}

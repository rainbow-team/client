import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { WitnessMonitorSercice } from 'src/app/services/monitor/witness.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-witness',
  templateUrl: './witness.component.html',
  styleUrls: ['./witness.component.scss']
})
export class WitnessComponent implements OnInit {
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

  obj: any = '';

  items: any = '';

  witness_date: any = [];

  selectId: any = '';
  uploadUrl: any = AppConfig.serviceAddress + '/witnessmonitor/importData';

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private witnessMonitorSercice: WitnessMonitorSercice,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService,
    private umineService: UmineService,
    private utilitiesSercice: UtilitiesSercice
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);

    if (this.servicedepartId || this.umineId || this.equipdepartId) {
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

    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }

    if (this.obj) {
      option.conditions.push({ key: 'witness_obj', value: this.obj });
    }

    if (this.items) {
      option.conditions.push({ key: 'witness_items', value: this.items });
    }

    if (this.witness_date && this.witness_date.length > 0) {
      if (this.witness_date[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.witness_date[0]
        });
      }

      if (this.witness_date[1]) {
        option.conditions.push({
          key: 'end_date',
          value: this.witness_date[1]
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

    if (this.equipdepartId) {
      option.conditions.push({
        key: 'equipdepartId',
        value: this.equipdepartId
      });
    }
    this.witnessMonitorSercice.getWitnessMonitorList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  reset() {
    this.name = '';
    this.obj = '';
    this.items = '';
    this.witness_date = [];
    this.selectId = '';
  }

  add() {
    this.router.navigate(['/monitor/witness/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/monitorwitnessAdd'], {
        queryParams: {
          id: item.id,
          isShow: true,
          servicedepartId: this.servicedepartId
        }
      });
    } else if (this.umineId) {
      this.router.navigate(['/searchShow/integratedAuery/monitorwitnessAdd'], {
        queryParams: { id: item.id, isShow: true, umineId: this.umineId }
      });
    } else if (this.equipdepartId) {
      this.router.navigate(['/searchShow/integratedAuery/monitorwitnessAdd'], {
        queryParams: {
          id: item.id,
          isShow: true,
          equipdepartId: this.equipdepartId
        }
      });
    } else {
      this.router.navigate(['/monitor/witness/add'], {
        queryParams: { id: item.id, isShow: true }
      });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/monitor/witness/add'], {
        queryParams: { id: this.selectId, isShow: false }
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.witnessMonitorSercice
        .deleteWitnessMonitorById(this.selectId)
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
}

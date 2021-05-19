import { Component, OnInit, Input, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { PermitFacSercice } from 'src/app/services/permit/permit.fac.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-permit-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss'],
})
export class PermitFacComponent implements OnInit {
  @Input() facId: any = '';

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = '';
  facName: any = '';
  permitStageIds: any = '';
  permit_date: any = [];
  state: any = ''; // 审核状态,查询条件

  selectId: any = '';
  uploadUrl: any = AppConfig.serviceAddress + '/facpermit/importData';
  canManage: any = false;
  canAudit: any = false;
  pageHeight: any;
  checked: any = false;

  auditValue: any = '3'; // 审核结果，默认审核通过

  stateColors: string[] = ['black', '#2db7f5', '#f50', '#87d068'];
  showLoading = false; // 审核过程loading显示控制
  showAuditDialog = false; // 审核弹窗显示控制
  currentDate: string;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private msg: NzMessageService,
    private permit_FacSercice: PermitFacSercice,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private utilitiesSercice: UtilitiesSercice
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();
    this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);

    this.canManage = this.utilitiesSercice.checkPermission('permit:fac:manage');
    this.canAudit = this.utilitiesSercice.checkPermission('audit');
    this.pageHeight = this.facId ? 505 : 395;
    this.search();
  }

  // 查询
  search() {
    let option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: [],
    };

    if (this.serviceDepartName) {
      option.conditions.push({
        key: 'serviceDepartName',
        value: this.serviceDepartName,
      });
    }
    if (this.facName) {
      option.conditions.push({ key: 'facName', value: this.facName });
    }
    if (this.state) {
      option.conditions.push({ key: 'state', value: this.state });
    }
    if (this.permitStageIds) {
      option.conditions.push({
        key: 'permitStageIds',
        value: [this.permitStageIds],
      });
    }
    if (this.permit_date && this.permit_date.length > 0) {
      if (this.permit_date[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.permit_date[0],
        });
      }

      if (this.permit_date[1]) {
        option.conditions.push({ key: 'end_date', value: this.permit_date[1] });
      }
    }

    if (this.facId) {
      option.conditions.push({ key: 'facId', value: this.facId });
    }

    if (this.checked) {
      option.conditions.push({ key: 'checked', value: 'checked' });
    }

    this.permit_FacSercice.getFacPermitList(option).subscribe((data) => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });
  }

  // 重置搜索条件
  reset() {
    this.serviceDepartName = '';
    this.facName = '';
    this.permitStageIds = '';
    this.permit_date = [];
    this.selectId = '';
  }

  // “添加”按钮的响应函数
  add() {
    this.router.navigate(['/permit/fac/add']);
  }

  // 查看数据
  show(item) {
    if (this.facId) {
      this.router.navigate(['/searchShow/integratedAuery/permitfacAdd'], {
        queryParams: { id: item.id, isShow: true, facId: this.facId },
      });
    } else {
      this.router.navigate(['/permit/fac/add'], {
        queryParams: { id: item.id, isShow: true },
      });
    }
  }

  // 修改数据
  modify() {
    if (this.selectId) {
      this.router.navigate(['/permit/fac/add'], {
        queryParams: { id: this.selectId, isShow: false },
      });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  // 删除数据
  delete() {
    if (this.selectId) {
      this.permit_FacSercice.deleteFacPermitByIds([this.selectId]).subscribe((res) => {
        if (res.code === 200) {
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

  // 审核按钮响应函数
  audit() {
    if (this.selectId) {
      this.showAuditDialog = true;
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
    } else {
      this.msg.create('warning', '请选择审核项');
    }
  }
  // 取消审核
  handleCancel() {
    this.showAuditDialog = false;
  }

  // 提交审核
  handleOk() {
    this.showLoading = true;
    this.permit_FacSercice.audit({ id: this.selectId, state: this.auditValue }).subscribe((res) => {
      if (res.code === 200) {
        this.msg.create('success', res.msg);
        this.search();
      } else {
        this.msg.create('error', res.msg);
      }
      this.showLoading = false;
      this.showAuditDialog = false;
    });
  }

  // 选中事件
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

  // 导出
  exportFacPermit() {
    let start_date = '',
      end_date = '';
    if (this.permit_date && this.permit_date.length > 0) {
      if (this.permit_date[0]) {
        start_date = this.permit_date[0];
      }

      if (this.permit_date[1]) {
        end_date = this.permit_date[1];
      }
    }

    let url =
      AppConfig.serviceAddress +
      '/facpermit/exportFacPermit?serviceDepartName=' +
      this.serviceDepartName +
      '&facName=' +
      this.facName +
      '&permitStageIds=' +
      this.permitStageIds +
      '&start_date=' +
      encodeURIComponent(start_date) +
      '&end_date=' +
      encodeURIComponent(end_date);

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }
}

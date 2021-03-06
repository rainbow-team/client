import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivityCheckSercice } from 'src/app/services/check/activity.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-check-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() servicedepartId: any = "";
  @Input() umineId: any = "";
  @Input() equipdepartId: any = "";
  @Input() facId: any = "";

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  facName: any = "";

  typeIds: any = [];

  content: any = "";

  selectId: any = "";
  canManage: any = false;
  pageHeight:any;

  checked: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private activityCheckSercice: ActivityCheckSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService, private facService: FacSercice,
    private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    if (this.servicedepartId || this.umineId || this.equipdepartId || this.facId) {
      this.isSearchShow = true;
    }
    this.canManage = this.utilitiesSercice.checkPermission('check:activity:manage');

    this.pageHeight = this.isSearchShow ? 505 : 395;
    this.search();


  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }

    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }

    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: [this.typeIds] })
    }

    if (this.content) {
      option.conditions.push({ key: "content", value: this.content })
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

    if (this.facId) {
      option.conditions.push({
        key: 'facId',
        value: this.facId
      });
    }

    if (this.checked) {
      option.conditions.push({ key: "checked", value: "checked" })
    }

    this.activityCheckSercice.getActivityCheckList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.facName = "";
    this.typeIds = [];
    this.content = "";
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/check/activity/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/checkActivityAdd'], { queryParams: { id: item.id, isShow: true, servicedepartId: this.servicedepartId } });
    } else if (this.umineId) {
      this.router.navigate(['/searchShow/integratedAuery/checkActivityAdd'], { queryParams: { id: item.id, isShow: true, umineId: this.umineId } });
    } else if (this.equipdepartId) {
      this.router.navigate(['/searchShow/integratedAuery/checkActivityAdd'], { queryParams: { id: item.id, isShow: true, equipdepartId: this.equipdepartId } });
    } else if (this.facId) {
      this.router.navigate(['/searchShow/integratedAuery/checkActivityAdd'], { queryParams: { id: item.id, isShow: true, facId: this.facId } });
    } else {
      this.router.navigate(['/check/activity/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/check/activity/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {


      this.activityCheckSercice.deleteActivityCheckById(this.selectId).subscribe((res) => {

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

  exportActivityCheck() {

    let url =
      AppConfig.serviceAddress +
      '/activitycheck/exportActivityCheck?name=' + this.name
      + '&facName=' + this.facName + '&typeIds=' + this.typeIds
      + '&content=' + this.content;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, '_blank');
  }
}

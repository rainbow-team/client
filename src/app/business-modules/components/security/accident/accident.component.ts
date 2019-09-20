import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { AccidentSecuritySercice } from 'src/app/services/security/accident.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {

  @Input() servicedepartId: any = "";
  @Input() umineId: any = "";

  isSearchShow: any = false;
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  depart: any = "";

  fac: any = "";

  facStatusTypeIds: any = [];

  uminePlaceStatusTypeIds: any = [];

  name: any = "";

  occur_date: any = [];

  typeIds: any = [];

  natureIds: any = [];

  selectId: any = "";

  canManage: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private accidentSecuritySercice: AccidentSecuritySercice,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private uminePlaceService: UminePlaceService, private serviceDepartService: ServiceDepartService,
    private umineService: UmineService, private facSercice: FacSercice, private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("security:accident:manage");

    if (this.servicedepartId || this.umineId) {
      this.isSearchShow = true;
    }
    this.search();

  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.depart) {
      // option.conditions.push({ key: "serviceDepartName", value: this.depart })
      // option.conditions.push({ key: "umineName", value: this.depart })
      option.conditions.push({ key: "depart", value: this.depart })
    }

    if (this.fac) {
      // option.conditions.push({ key: "facName", value: this.fac })
      // option.conditions.push({ key: "uminePlaceName", value: this.fac })
      option.conditions.push({ key: "fac", value: this.fac })
    }

    if (this.facStatusTypeIds.length > 0) {
      option.conditions.push({ key: "facStatusTypeIds", value: [this.facStatusTypeIds] })
    }

    if (this.uminePlaceStatusTypeIds.length > 0) {
      option.conditions.push({ key: "uminePlaceStatusTypeIds", value: [this.uminePlaceStatusTypeIds] })
    }

    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }

    if (this.occur_date && this.occur_date.length > 0) {
      if (this.occur_date[0]) {
        option.conditions.push({ key: "start_date", value: this.occur_date[0] })
      }

      if (this.occur_date[1]) {
        option.conditions.push({ key: "end_date", value: this.occur_date[1] })
      }
    }

    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: [this.typeIds] })
    }

    if (this.natureIds.length > 0) {
      option.conditions.push({ key: "natureIds", value: [this.natureIds] })
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

    this.accidentSecuritySercice.getAccidentSecurityList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.depart = "";

    this.fac = "";

    this.facStatusTypeIds = [];

    this.uminePlaceStatusTypeIds = [];

    this.name = "";

    this.occur_date = [];

    this.typeIds = [];

    this.natureIds = [];

    this.selectId = "";
  }

  add() {
    this.router.navigate(['/security/accident/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/securityaccidentAdd'], { queryParams: { id: item.id, isShow: true, servicedepartId: this.servicedepartId } });
    } else if (this.umineId) {
      this.router.navigate(['/searchShow/integratedAuery/securityaccidentAdd'], { queryParams: { id: item.id, isShow: true, umineId: this.umineId } });
    } else {
      this.router.navigate(['/security/accident/add'], { queryParams: { id: item.id, isShow: true } });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/security/accident/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.accidentSecuritySercice.deleteAccidentSecurityById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else {
          this.msg.create("error", res.msg);
        }
      })
    }
    else {
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

  exportAccidentSecurity() {

    let start_date = "", end_date = "";
    if (this.occur_date && this.occur_date.length > 0) {
        if (this.occur_date[0]) {
            start_date = this.occur_date[0];
        }

        if (this.occur_date[1]) {
            end_date = this.occur_date[1];
        }
    }

    let url = AppConfig.serviceAddress + "/accidentsecurity/exportAccidentSecurity?depart=" + this.depart
        +  "&fac=" + this.fac + "&facStatusTypeIds=" + this.facStatusTypeIds
        +  "&uminePlaceStatusTypeIds=" + this.uminePlaceStatusTypeIds + "&name=" + this.name
        +  "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date)
        +  "&typeIds=" + this.typeIds + "&natureIds=" + this.natureIds;

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");
  }
}
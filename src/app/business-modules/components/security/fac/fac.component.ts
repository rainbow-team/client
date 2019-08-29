import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { FacSecuritySercice } from 'src/app/services/security/fac.service';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-security-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class SecurityFacComponent implements OnInit {

  @Input() servicedepartId: any = "";
  @Input() facId: any = "";

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = "";

  facName: any = "";

  facStatusTypeIds: any = [];

  checkTypeIds: any = [];

  content: any = "";

  find_date: any = [];

  questionTypeIds: any = [];

  questionNatureIds: any = [];

  reformStatusTypeIds: any = [];

  condition = {
    tableName: 'unit_fac',
    propertyName: 'build_year',
    configTableName: 'config_fac_supervison_category'
  }

  data: any = [];

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private facSecuritySercice: FacSecuritySercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private serviceDepartService: ServiceDepartService,
    private facSercice: FacSercice, private statisticsSercice: StatisticsSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    if (this.servicedepartId || this.facId) {
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

    if (this.serviceDepartName) {
      option.conditions.push({ key: "serviceDepartName", value: this.serviceDepartName })
    }

    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }

    if (this.facStatusTypeIds.length > 0) {
      option.conditions.push({ key: "facStatusTypeIds", value: [this.facStatusTypeIds] })
    }

    if (this.checkTypeIds.length > 0) {
      option.conditions.push({ key: "checkTypeIds", value: [this.checkTypeIds] })
    }

    if (this.content) {
      option.conditions.push({ key: "content", value: this.content })
    }

    if (this.find_date && this.find_date.length > 0) {
      if (this.find_date[0]) {
        option.conditions.push({ key: "start_date", value: this.find_date[0] })
      }

      if (this.find_date[1]) {
        option.conditions.push({ key: "end_date", value: this.find_date[1] })
      }
    }

    if (this.questionTypeIds.length > 0) {
      option.conditions.push({ key: "questionTypeIds", value: [this.questionTypeIds] })
    }

    if (this.questionNatureIds.length > 0) {
      option.conditions.push({ key: "questionNatureIds", value: [this.questionNatureIds] })
    }

    if (this.reformStatusTypeIds.length > 0) {
      option.conditions.push({ key: "reformStatusTypeIds", value: [this.reformStatusTypeIds] })
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
    this.facSecuritySercice.getFacSecurityList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.serviceDepartName = "";
    this.facName = "";
    this.facStatusTypeIds = [];
    this.checkTypeIds = [];
    this.content = "";
    this.find_date = [];
    this.questionTypeIds = [];
    this.questionNatureIds = [];
    this.reformStatusTypeIds = [];

    this.statisticsSercice.getStatisticsResultByYear(this.condition).subscribe((res) => {

      this.data = res.msg;
    });
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/security/fac/add']);
  }

  show(item) {
    if (this.servicedepartId) {
      this.router.navigate(['/searchShow/integratedAuery/securityfacAdd'], { queryParams: { id: item.id, isShow: true, servicedepartId: this.servicedepartId } });
    } else if (this.facId) {
      this.router.navigate(['/searchShow/integratedAuery/securityfacAdd'], { queryParams: { id: item.id, isShow: true, facId: this.facId } });
    } else {
      this.router.navigate(['/security/fac/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/security/fac/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.facSecuritySercice.deleteFacSecurityById(this.selectId).subscribe((res) => {

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
}
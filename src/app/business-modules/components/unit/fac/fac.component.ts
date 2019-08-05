import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class FacComponent implements OnInit {

  @Input() isSearchShow = "0";
  
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];
  ServiceDepartList: any = [];

  name: any = "";
  code: any = "";
  ServiceDepartIds: any = [];
  build_year: any = [];
  supervisionCategoryIds: any = [];
  typeIds: any = [];
  statusId: any = [];
  reviewStatusId: any = [];
  facPermitSituationId: any = [];
  isEarthquake: any = "";
  isFlood: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private facSercice: FacSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private serviceDepartService: ServiceDepartService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.serviceDepartService.getAllDepartService().subscribe((res) => {
      if (res.code == 200) {
        this.ServiceDepartList = [];
        res.msg.forEach(element => {
          this.ServiceDepartList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    })

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

    if (this.code) {
      option.conditions.push({ key: "code", value: this.code })
    }

    if (this.ServiceDepartIds && this.ServiceDepartIds.length > 0) {
      option.conditions.push({ key: "ServiceDepartIds", value: this.ServiceDepartIds })
    }

    if (this.build_year && this.build_year.length > 0) {
     
      if (this.build_year[0]) {
        option.conditions.push({ key: "start_date", value: this.build_year[0] })
      }

      if (this.build_year[1]) {
        option.conditions.push({ key: "end_date", value: this.build_year[1] })
      }
    }

    if (this.supervisionCategoryIds && this.supervisionCategoryIds.length > 0) {
      option.conditions.push({ key: "supervisionCategoryIds", value: this.supervisionCategoryIds })
    }

    if (this.typeIds && this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: this.typeIds })
    }

    if (this.statusId && this.statusId.length > 0) {
      option.conditions.push({ key: "statusId", value: this.statusId })
    }

    if (this.reviewStatusId && this.reviewStatusId.length > 0) {
      option.conditions.push({ key: "reviewStatusId", value: this.reviewStatusId })
    }

    if (this.facPermitSituationId && this.facPermitSituationId.length > 0) {
      option.conditions.push({ key: "facPermitSituationId", value: this.facPermitSituationId })
    }

    if (this.isEarthquake) {
      option.conditions.push({ key: "isEarthquake", value: this.isEarthquake })
    }

    if (this.isFlood) {
      option.conditions.push({ key: "isFlood", value: this.isFlood })
    }

    this.facSercice.getFacList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.code = "";
    this.ServiceDepartIds = [];
    this.build_year = "";
    this.supervisionCategoryIds = [];
    this.typeIds = [];
    this.statusId = [];
    this.reviewStatusId = [];
    this.facPermitSituationId = [];
    this.isEarthquake = "";
    this.isFlood = "";
  }

  add() {
    this.router.navigate(['/unit/fac/add']);
  }

  childmanage(item) {
    this.router.navigate(['/unit/fac/childmanage'], { queryParams: { id: item.id } });
  }

  show(item, flag) {
    this.router.navigate(['/unit/fac/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.facSercice.deleteFacById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else if (res.code == 500) {
        this.msg.create("warning", res.msg);
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

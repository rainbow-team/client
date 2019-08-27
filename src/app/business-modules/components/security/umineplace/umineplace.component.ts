import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { UmineplaceSecuritySercice } from 'src/app/services/security/umineplace.service';

@Component({
  selector: 'app-security-umineplace',
  templateUrl: './umineplace.component.html',
  styleUrls: ['./umineplace.component.scss']
})
export class SecurityUmineplaceComponent implements OnInit {

  @Input() umineId: any = "";
  @Input() umineplaceId: any = "";

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = "";

  uminePlaceName: any = "";

  statusTypeIds: any = [];

  checkTypeIds: any = [];

  content: any = "";

  find_date: any = [];

  questionTypeIds: any = [];

  questionNatureIds: any = [];

  reformStatusTypeIds: any = [];

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private umineService: UmineService,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private umineplaceSecuritySercice: UmineplaceSecuritySercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();


    if (this.umineId || this.umineplaceId) {
      this.isSearchShow = true;
    }

    this.search();

    // this.serviceDepartService.getAllDepartService().subscribe((res) => {
    //   if (res.code == 200) {
    //     this.serviceDepartList = [];
    //     res.msg.forEach(element => {
    //       this.serviceDepartList.push({
    //         id: element.id,
    //         name: element.name
    //       });
    //     });
    //   }
    // })


    // this.facSercice.getAllDepartService().subscribe((res) => {
    //   if (res.code == 200) {
    //     this.serviceDepartList = [];
    //     res.msg.forEach(element => {
    //       this.serviceDepartList.push({
    //         id: element.id,
    //         name: element.name
    //       });
    //     });
    //   }
    // })

  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.umineName) {
      option.conditions.push({ key: "umineName", value: this.umineName })
    }

    if (this.uminePlaceName) {
      option.conditions.push({ key: "uminePlaceName", value: this.uminePlaceName })
    }

    if (this.statusTypeIds.length > 0) {
      option.conditions.push({ key: "statusTypeIds", value: [this.statusTypeIds] })
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

    // if (this.groupIds.length > 0) {
    //   option.conditions.push({ key: "groupIds", value: this.groupIds })
    // }

    if (this.umineId) {
      option.conditions.push({ key: "umineId", value: this.umineId })
    }
    if (this.umineplaceId) {
      option.conditions.push({ key: "umineplaceId", value: this.umineplaceId })
    }


    this.umineplaceSecuritySercice.getUmineplaceSecurityList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.umineName = "";
    this.uminePlaceName = "";
    this.statusTypeIds = [];
    this.checkTypeIds = [];
    this.content = "";
    this.find_date = [];
    this.questionTypeIds = [];
    this.questionNatureIds = [];
    this.reformStatusTypeIds = [];
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/security/umineplace/add']);
  }

  show(item) {

    if (this.umineId) {
      this.router.navigate(['/searchShow/integratedAuery/securityUmineplaceAdd'], { queryParams: { id: item.id, isShow: true, umineId: this.umineId } });
    } else if (this.umineplaceId) {
      this.router.navigate(['/searchShow/integratedAuery/securityUmineplaceAdd'], { queryParams: { id: item.id, isShow: true, umineplaceId: this.umineplaceId } });
    } else {
      this.router.navigate(['/security/umineplace/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/security/umineplace/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {
      this.umineplaceSecuritySercice.deleteUmineplaceSecurityById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else {
          this.msg.create("error", res.msg);
        }
      })
    }else {
      this.msg.create("warning", "请选择删除项");
    }
  }

  selectItem(data) {
    this.selectId = data.id;
  }
}


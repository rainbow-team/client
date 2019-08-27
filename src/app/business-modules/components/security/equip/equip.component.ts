import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { EquipSecuritySercice } from 'src/app/services/security/equip.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';

@Component({
  selector: 'app-security-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class SecurityEquipComponent implements OnInit {

  @Input() equipdepartId: any = "";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  equipDepartName: any = "";

  name: any = "";

  serviceDepartName: any = "";

  facName: any = "";

  checkTypeIds: any = [];

  content: any = "";

  find_date: any = [];

  questionTypeIds: any = [];

  reformStatusTypeIds: any = [];

  selectId: any = "";
  // equipDepartIds: any = [];

  // equipDepartList: any = [];

  // serviceDepartIds: any = [];

  // serviceDepartList: any = [];

  // facIds: any = [];

  // facList: any = [];


  constructor(private router: Router,
    private msg: NzMessageService, private equipSecuritySercice: EquipSecuritySercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private serviceDepartService: ServiceDepartService, private facSercice: FacSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

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
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }


    if (this.equipDepartName) {
      option.conditions.push({ key: "equipDepartName", value: this.equipDepartName })
    }

    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }

    if (this.serviceDepartName) {
      option.conditions.push({ key: "serviceDepartName", value: this.serviceDepartName })
    }

    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
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

    if (this.reformStatusTypeIds.length > 0) {
      option.conditions.push({ key: "reformStatusTypeIds", value: [this.reformStatusTypeIds] })
    }


    if (this.equipdepartId) {
      option.conditions.push({ key: "equipdepartId", value: this.equipdepartId })
    }

    this.equipSecuritySercice.getEquipSecurityList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.equipDepartName = "";
    this.name = "";
    this.serviceDepartName = "";
    this.facName = "";
    this.checkTypeIds = [];
    this.content = "";
    this.find_date = [];
    this.questionTypeIds = [];
    this.reformStatusTypeIds = [];
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/security/equip/add']);
  }

  show(item) {

    if (this.equipdepartId) {
      this.router.navigate(['/searchShow/integratedAuery/securityequipAdd'], { queryParams: { id: item.id, isShow: true, equipdepartId: this.equipdepartId } });
    } else {
      this.router.navigate(['/security/equip/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/security/equip/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {

      this.equipSecuritySercice.deleteEquipSecurityById(this.selectId).subscribe((res) => {

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

}

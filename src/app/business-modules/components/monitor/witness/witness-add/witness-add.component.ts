import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { CheckMonitorSercice } from 'src/app/services/monitor/check.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { WitnessMonitorSercice } from 'src/app/services/monitor/witness.service';

@Component({
  selector: 'app-witness-add',
  templateUrl: './witness-add.component.html',
  styleUrls: ['./witness-add.component.scss']
})
export class WitnessAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  servicedepartId_Router: any = "";

  data: any = {};
  isSaving = false;
  isDisable = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  serviceDepartList: any = [];

  umineList: any = [];

  equipDepartList: any = [];

  orgList: any = [];

  checkData: any = [];

  departType: any = "";

  constructor(private msg: NzMessageService, private router: Router,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private attachmentSercice: AttachmentSercice,
    private witnessMonitorSercice: WitnessMonitorSercice, private serviceDepartService: ServiceDepartService,
    private umineService: UmineService, private equipDepartService: EquipDepartService,
    private orgSercice: OrgSercice, ) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let flag = this.ActivatedRoute.snapshot.queryParams["flag"];

    this.servicedepartId_Router = this.ActivatedRoute.snapshot.queryParams["servicedepartId"];

    if (flag && flag == "true") {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }


    this.serviceDepartService.getAllDepartService().subscribe((res) => {

      this.serviceDepartList = res.msg;
    })

    this.umineService.getAllUmine().subscribe((res) => {

      this.umineList = res.msg;
    })

    this.equipDepartService.getAllEquipDepart().subscribe((res) => {

      this.equipDepartList = res.msg;
    })

    this.orgSercice.getAllOrgList().subscribe((res) => {

      this.orgList = res.msg;
    })

    if (id) {
      this.witnessMonitorSercice.getWitnessMonitorById(id).subscribe((res) => {
        this.data = res.msg;
        if (this.data.serviceId) {
          this.departType = "fac";
        }
        if (this.data.umineId) {
          this.departType = "umine";
        }
        if (this.data.equipDepartId) {
          this.departType = "equip";
        }
      });

      this.attachmentSercice.getFileListById(id).subscribe((res1) => {

        if (res1.msg.length > 0) {
          res1.msg.forEach(element => {
            this.fileList.push({
              response: {
                msg: element.fileinfoId
              },
              name: element.fileinfoClientFileName
            });
          });
        }
      })


    } else {
      this.data.createDate = new Date();
      this.data.creatorId = this.staffObj.id;
    }

  }


  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.attachmentList = [];

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    if (this.departType == "fac") {
      this.data.umineId = "";
      this.data.equipDepartId = "";
      this.data.departTypeId = "0225987e-b1c6-11e9-afa3-507b9dae29a9";
    }

    if (this.departType == "umine") {
      this.data.serviceId = "";
      this.data.equipDepartId = "";
      this.data.departTypeId = "08035739-b1c6-11e9-afa3-507b9dae29a9";
    }

    if (this.departType == "equip") {
      this.data.serviceId = "";
      this.data.umineId = "";
      this.data.departTypeId = "0d7caeec-b1c6-11e9-afa3-507b9dae29a9";
    }
    this.witnessMonitorSercice.saveOrUpdateWitnessMonitor(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/monitor/witness']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {

    if (this.servicedepartId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/servicedepartSearch'], { queryParams: { id: this.servicedepartId_Router, idx: 5 } });
    } else {
      this.router.navigate(['/monitor/witness']);
    }

  }



  //表单手动触发验证
  FormValidation() {
    let isValid = true;
    this.directives.forEach(d => {
      if (!d.validationValue()) {
        isValid = false;
      }
    });
    return isValid;
  }

}

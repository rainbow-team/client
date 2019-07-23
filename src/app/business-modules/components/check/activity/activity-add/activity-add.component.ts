import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AccidentSecuritySercice } from 'src/app/services/security/accident.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { ActivityCheckSercice } from 'src/app/services/check/activity.service';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {


  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isDisable = false;
  fileList = [
  ];

  dictionary: any = {};
  staffObj: any = {};

  activityType:any="";

  serviceDepartList: any = [];

  facList: any = [];

  equipDepartList: any = [];


  constructor(private msg: NzMessageService, private router: Router,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private attachmentSercice: AttachmentSercice,
    private activityCheckSercice: ActivityCheckSercice, private equipDepartService: EquipDepartService, 
    private serviceDepartService: ServiceDepartService, private facSercice: FacSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let flag = this.ActivatedRoute.snapshot.queryParams["flag"];

    if (flag && flag == "true") {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }


    this.serviceDepartService.getAllDepartService().subscribe((res) => {

      this.serviceDepartList = res.msg;

    })
    this.equipDepartService.getAllEquipDepart().subscribe((res) => {

      this.equipDepartList = res.msg;
    })

    if (id) {
      this.activityCheckSercice.getActivityById(id).subscribe((res) => {
        this.data = res.msg;
        if (this.data.serviceId) {
          this.activityType = "fac";

          this.facSercice.getFacListByServiceid(this.data.serviceId).subscribe((res) => {
            this.facList = res.msg;
          });
        }
        if (this.data.equipDepartId) {
          this.activityType = "equip";
          this.equipDepartService.getAllEquipDepart().subscribe((res) => {
            this.equipDepartList = res.msg;
          });
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
    if (this.activityType == "fac") {
      this.data.equipDepartId = "";
    }

    if (this.activityType == "equip") {
      this.data.serviceId = "";
      this.data.facId = "";
    }

    this.activityCheckSercice.saveOrUpdateActivity(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/check/activity']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/check/activity']);
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

  serviceDepartChange(value: string): void {
    this.facSercice.getFacListByServiceid(value).subscribe((res) => {
      this.facList = res.msg;
    })
  }

}

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { EquipSecuritySercice } from 'src/app/services/security/equip.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';

@Component({
  selector: 'app-securuty-equip-add',
  templateUrl: './equip-add.component.html',
  styleUrls: ['./equip-add.component.scss']
})
export class SecurityEquipAddComponent implements OnInit {

  equipdepartId_Router: any = "";

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isShow = false;
  fileList = [
  ];

  dictionary: any = {};
  staffObj: any = {};

  equipDepartList: any = [];

  serviceDepartList: any = [];

  facList: any = [];


  constructor(private msg: NzMessageService, private router: Router,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private attachmentSercice: AttachmentSercice,
    private equipSecuritySercice: EquipSecuritySercice, private equipDepartService: EquipDepartService,
    private facSercice: FacSercice, private serviceDepartService: ServiceDepartService) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    this.equipdepartId_Router = this.ActivatedRoute.snapshot.queryParams["equipdepartId"];

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }


    this.equipDepartService.getAllEquipDepart().subscribe((res) => {

      this.equipDepartList = res.msg;

    })

    this.serviceDepartService.getAllDepartService().subscribe((res) => {

      this.serviceDepartList = res.msg;

    })

    if (id) {
      this.equipSecuritySercice.getEquipSecurityById(id).subscribe((res) => {
        this.data = res.msg;
        this.facSercice.getFacListByServiceid(this.data.serviceId).subscribe((res) => {
          this.facList = res.msg;
        });
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
    this.equipSecuritySercice.saveOrUpdateEquipSecurity(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/security/equip']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {

    if (this.equipdepartId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/equipdepartSearch'], { queryParams: { id: this.equipdepartId_Router, idx: 6 } });

    } else {
      this.router.navigate(['/security/equip']);
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

  serviceDepartChange(value: string): void {
    this.facSercice.getFacListByServiceid(value).subscribe((res) => {
      this.facList = res.msg;
    })
  }

  // facChange(value: string): void {
  //   this.facSercice.getFacListByServiceid(this.data.serviceId).subscribe((res) => {
  //     this.facList = res.msg;
  //   })
  // }
}

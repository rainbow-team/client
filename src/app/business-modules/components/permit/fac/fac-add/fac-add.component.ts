import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { Permit_FacSercice } from 'src/app/services/permit/permit_fac.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-permit-fac-add',
  templateUrl: './fac-add.component.html',
  styleUrls: ['./fac-add.component.scss']
})
export class PermitFacAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  
  @ViewChild(AttachmentComponent)
  child:AttachmentComponent

  facId_Router: any = "";

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  serviceDepartList: any = [];

  facList: any = [];

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private permit_FacSercice: Permit_FacSercice,
    private serviceDepartService: ServiceDepartService, private facSercice: FacSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    this.facId_Router = this.ActivatedRoute.snapshot.queryParams["facId"];

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    this.serviceDepartService.getAllDepartService().subscribe((res) => {

      this.serviceDepartList = res.msg;
    })


    if (id) {
      this.permit_FacSercice.getFacPermitById(id).subscribe((res) => {
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
      this.isAdd = true;
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

    var fileList = this.child.fileList;
    if (fileList.length > 0) {

      if (!fileList[fileList.length-1].response) {

        this.msg.create('warning', '附件还未上传完毕,请稍等');
        this.isSaving = false;
        return;
      }
      fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.permit_FacSercice.saveOrUpdateFac(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/permit/fac']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {

    if (this.facId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/facSearch'], { queryParams: { id: this.facId_Router, idx: 1 } });
    } else {
      this.router.navigate(['/permit/fac']);
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
}

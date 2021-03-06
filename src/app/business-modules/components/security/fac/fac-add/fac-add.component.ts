import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { FacSecuritySercice } from 'src/app/services/security/fac.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-security-fac-add',
  templateUrl: './fac-add.component.html',
  styleUrls: ['./fac-add.component.scss']
})
export class SecurityFacAddComponent implements OnInit {

  servicedepartId_Router: any = "";
  facId_Router: any = "";
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  
  @ViewChild(AttachmentComponent)
  child:AttachmentComponent


  data: any = {};
  isSaving = false;
  isShow = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  serviceDepartList: any = [];

  facList: any = [];


  constructor(private msg: NzMessageService, private router: Router,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private attachmentSercice: AttachmentSercice,
    private facSecuritySercice: FacSecuritySercice, private serviceDepartService: ServiceDepartService,
    private facSercice: FacSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];
    this.servicedepartId_Router = this.ActivatedRoute.snapshot.queryParams["servicedepartId"];
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
      this.facSecuritySercice.getFacSecurityById(id).subscribe((res) => {
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
    this.facSecuritySercice.saveOrUpdateFacSecurity(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/security/fac']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {

    if (this.servicedepartId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/servicedepartSearch'], { queryParams: { id: this.servicedepartId_Router, idx: 6 } });
    } else if (this.facId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/facSearch'], { queryParams: { id: this.facId_Router, idx: 6 } });
    } else {
      this.router.navigate(['/security/fac']);
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

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UmineplaceSecuritySercice } from 'src/app/services/security/umineplace.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';

@Component({
  selector: 'app-security-umineplace-add',
  templateUrl: './umineplace-add.component.html',
  styleUrls: ['./umineplace-add.component.scss']
})
export class SecurityUmineplaceAddComponent implements OnInit {


  umineId_Router: any = "";
  umineplaceId_Router: any = "";

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isShow = false;
  fileList = [
  ];

  dictionary: any = {};
  staffObj: any = {};

  umineList: any = [];

  umineplaceList: any = [];


  constructor(private msg: NzMessageService, private router: Router,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private attachmentSercice: AttachmentSercice,
    private umineplaceSecuritySercice: UmineplaceSecuritySercice, private umineService: UmineService,
    private uminePlaceService: UminePlaceService) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    this.umineId_Router = this.ActivatedRoute.snapshot.queryParams["umineId"];
    this.umineplaceId_Router = this.ActivatedRoute.snapshot.queryParams["umineplaceId"];

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }


    this.umineService.getAllUmine().subscribe((res) => {

      this.umineList = res.msg;
    })

    if (id) {
      this.umineplaceSecuritySercice.getUmineplaceSecurityById(id).subscribe((res) => {
        this.data = res.msg;
        this.uminePlaceService.getUmineplaceListByUmineId(this.data.umineId).subscribe((res) => {
          this.umineplaceList = res.msg;
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
    this.umineplaceSecuritySercice.saveOrUpdateUmineplaceSecurity(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/security/umineplace']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    if (this.umineId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/umineSearch'], { queryParams: { id: this.umineId_Router, idx: 3 } });
    } else if (this.umineplaceId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/umineplaceSearch'], { queryParams: { id: this.umineplaceId_Router, idx: 3 } });
    } else {
      this.router.navigate(['/security/umineplace']);
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

  umineChange(value: string): void {
    this.uminePlaceService.getUmineplaceListByUmineId(value).subscribe((res) => {
      this.umineplaceList = res.msg;
    })
  }

  // facChange(value: string): void {
  //   this.facSercice.getFacListByServiceid(this.data.serviceId).subscribe((res) => {
  //     this.facList = res.msg;
  //   })
  // }
}

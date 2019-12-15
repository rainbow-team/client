import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UmineplacePermitService } from 'src/app/services/permit/umineplace.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-permit-umineplace-add',
  templateUrl: './umineplace-add.component.html',
  styleUrls: ['./umineplace-add.component.scss']
})
export class UmineplacePermitAddComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  
  @ViewChild(AttachmentComponent)
  child:AttachmentComponent

  umineplaceId_Router: any = "";

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  //铀尾矿(渣)库
  unitUminePlaces: any = [];
  //铀矿冶单位
  unitUmines: any = [];

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private umineService: UmineService,
    private uminePlaceService: UminePlaceService,
    private umineplacePermitService: UmineplacePermitService
  ) { }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams['id'];
    let isShow = this.ActivatedRoute.snapshot.queryParams['isShow'];
    this.umineplaceId_Router = this.ActivatedRoute.snapshot.queryParams['umineplaceId'];

    if (isShow && isShow == 'true') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    this.umineService.getAllUmine().subscribe(res => {
      this.unitUmines = res.msg;
    });

    if (id) {
      this.umineplacePermitService.getUmineplacePermitById(id).subscribe(res => {
        this.data = res.msg;
        this.uminePlaceService
          .getUmineplaceListByUmineId(this.data.umineId)
          .subscribe(res1 => {
            this.unitUminePlaces = res1.msg;
          });
      });

      this.attachmentSercice.getFileListById(id).subscribe(res1 => {
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
      });
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
    this.umineplacePermitService
      .saveOrUpdateUmineplacePermit(this.data)
      .subscribe(res => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/permit/umineplace']);
        } else {
          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
  }

  close() {

    if (this.umineplaceId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/umineplaceSearch'], { queryParams: { id: this.umineplaceId_Router, idx: 1 } });

    } else {
      this.router.navigate(['/permit/umineplace']);
    }

  }

  //根据铀矿冶单位获取对应的铀尾矿（渣）库信息
  changeunitUminePlaces(umineId) {
    this.uminePlaceService
      .getUmineplaceListByUmineId(umineId)
      .subscribe(res => {
        this.unitUminePlaces = res.msg;
      });
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

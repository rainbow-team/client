import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UmineMountainPermitService } from 'src/app/services/permit/uminemountain.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';

@Component({
  selector: 'app-uminemountain-add',
  templateUrl: './uminemountain-add.component.html',
  styleUrls: ['./uminemountain-add.component.scss']
})
export class UminemountainPermitAddComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  backupFileList = [];
  acceptFileList=[];

  dictionary: any = {};
  staffObj: any = {};

  //铀矿冶单位
  unitUmines: any = [];
  //铀尾山
  umineMountains: any = [];

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private umineService: UmineService,
    private umineMountainService: UmineMountainService,
    private umineMountainPermitService: UmineMountainPermitService
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams['id'];
    let isShow = this.ActivatedRoute.snapshot.queryParams['isShow'];

    if (isShow && isShow == 'true') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    this.umineService.getAllUmine().subscribe(res => {
      this.unitUmines = res.msg;
    });

    if (id) {
      this.umineMountainPermitService.getUmineMountainPermitById(id).subscribe(res => {
          this.data = res.msg;
          this.umineMountainService.getUminemountinaListByUmineId(this.data.umineId).subscribe(res1 => {
            this.umineMountains = res1.msg;
          });
          //获取备案附件
          this.attachmentSercice.getFileListById(this.data.recordAttachId).subscribe(res1 => {
            if (res1.msg.length > 0) {
              res1.msg.forEach(element => {
                this.backupFileList.push({
                  response: {
                    msg: element.fileinfoId
                  },
                  name: element.fileinfoClientFileName
                });
              });
            }
          });

        //获取验收附件
        this.attachmentSercice.getFileListById(this.data.acceptAttachId).subscribe(res1 => {
          if (res1.msg.length > 0) {
            res1.msg.forEach(element => {
              this.acceptFileList.push({
                response: {
                  msg: element.fileinfoId
                },
                name: element.fileinfoClientFileName
              });
            });
          }
        });

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
    this.data.backupAttachmentList = [];
    this.data.acceptpAttachmentList = [];

    if (this.backupFileList.length > 0) {
      this.backupFileList.forEach(element => {
        this.data.backupAttachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    if (this.acceptFileList.length > 0) {
      this.acceptFileList.forEach(element => {
        this.data.acceptpAttachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.umineMountainPermitService.saveOrUpdateUmineMountainPermit(this.data).subscribe(res => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/permit/uminemountain']);
        } else {
          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
  }

  close() {
    this.router.navigate(['/permit/uminemountain']);
  }

  //根据铀矿冶单位获取对应的铀矿山信息
  changeunitUmineMountains(umineId) {
    this.umineMountainService
      .getUminemountinaListByUmineId(umineId)
      .subscribe(res => {
        this.umineMountains = res.msg;
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

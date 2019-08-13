import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UmineplaceCheckSercice } from 'src/app/services/check/umineplace.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { UminemountainCheckSercice } from 'src/app/services/check/uminemountain.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';

@Component({
  selector: 'app-check-uminemountain-add',
  templateUrl: './uminemountain-add.component.html',
  styleUrls: ['./uminemountain-add.component.scss']
})
export class CheckUminemountainAddComponent implements OnInit {


  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  uminemountainId_Roter: any = "";

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  umineList: any = [];

  uminemountainList: any = [];

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private uminemountainCheckSercice: UminemountainCheckSercice,
    private umineService: UmineService, private umineMountainService: UmineMountainService) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    this.uminemountainId_Roter = this.ActivatedRoute.snapshot.queryParams["uminemountainId"];

    this.umineService.getAllUmine().subscribe((res) => {

      this.umineList = res.msg;

    })

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (id) {
      this.uminemountainCheckSercice.getUminemountainCheckById(id).subscribe((res) => {
        this.data = res.msg;

        if (this.data.umineId) {

          this.umineMountainService.getUminemountinaListByUmineId(this.data.umineId).subscribe((res) => {
            this.uminemountainList = res.msg;
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

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.uminemountainCheckSercice.saveOrUpdateUminemountainCheck(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/check/uminemountain']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {

    if (this.uminemountainId_Roter) {
      this.router.navigate(['/searchShow/integratedAuery/uminmountainSearch'], { queryParams: { id: this.uminemountainId_Roter, idx: 2 } });
    } else {
      this.router.navigate(['/check/uminemountain']);
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
    this.umineMountainService.getUminemountinaListByUmineId(value).subscribe((res) => {
      this.uminemountainList = res.msg;
    })
  }
}

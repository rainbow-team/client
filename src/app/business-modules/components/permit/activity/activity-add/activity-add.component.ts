import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ActivityPermitService } from 'src/app/services/permit/activity.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityPermitAddComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isDisable = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  serviceDeparts: any = [];
  unitFacs: any = [];

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private serviceDepartService: ServiceDepartService,
    private facSercice: FacSercice,
    private activityPermitService: ActivityPermitService
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams['id'];
    let flag = this.ActivatedRoute.snapshot.queryParams['flag'];

    if (flag && flag == 'true') {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }

    this.serviceDepartService.getAllDepartService().subscribe(res => {
      this.serviceDeparts = res.msg;
    });

    // this.facSercice.getFacList().subscribe(res => {
    //   this.unitFacs = res.msg;
    // });

    if (id) {
      this.activityPermitService.getActivityPermitById(id).subscribe(res => {
        this.data = res.msg;
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
    // this.data.sex = this.sexValue;
    this.activityPermitService
      .saveOrUpdateActivityPermit(this.data)
      .subscribe(res => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/permit/activity']);
        } else {
          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
  }

  close() {
    this.router.navigate(['/permit/activity']);
  }

  //根据营运单位获取对应的核设施
  changeunitFacs(serviceid) {
    this.facSercice.getFacListByServiceid(serviceid).subscribe(res => {
      this.unitFacs = res.msg;
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

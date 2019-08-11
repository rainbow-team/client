import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ActivityPermitService } from 'src/app/services/permit/activity.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityPermitAddComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  @Input() servicedepartId: any = "";

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  activityType: any = "";

  serviceDepartList: any = [];
  facList: any = [];

  equipDepartList: any = [];

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private serviceDepartService: ServiceDepartService,
    private facSercice: FacSercice,
    private activityPermitService: ActivityPermitService,
    private equipDepartService: EquipDepartService
  ) { }

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

    this.serviceDepartService.getAllDepartService().subscribe(res => {
      this.serviceDepartList = res.msg;
    });

    this.equipDepartService.getAllEquipDepart().subscribe((res) => {
      this.equipDepartList = res.msg;
    })

    if (id) {
      this.activityPermitService.getActivityPermitById(id).subscribe(res => {
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
      this.activityType = "fac";
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

    if (this.servicedepartId) {
      this.router.navigate(['/permit/activity']);
    } else {
      this.router.navigate(['/searchShow/integratedAuery/servicedepartSearch'], { queryParams: { id:this.data.serviceId,idx: 1 } });
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

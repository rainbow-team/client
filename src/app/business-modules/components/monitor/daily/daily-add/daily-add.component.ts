import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { DailyMonitorSercice } from 'src/app/services/monitor/daily.service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-daily-add',
  templateUrl: './daily-add.component.html',
  styleUrls: ['./daily-add.component.scss']
})
export class DailyAddComponent implements OnInit {
  servicedepartId_Router: any = '';
  facId_Router: any = '';

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

  orgList: any = [];

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private activatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private dailyMonitorSercice: DailyMonitorSercice,
    private serviceDepartService: ServiceDepartService,
    private facSercice: FacSercice,
    private orgSercice: OrgSercice
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    let id = this.activatedRoute.snapshot.queryParams['id'];
    let isShow = this.activatedRoute.snapshot.queryParams['isShow'];

    this.servicedepartId_Router = this.activatedRoute.snapshot.queryParams[
      'servicedepartId'
    ];
    this.facId_Router = this.activatedRoute.snapshot.queryParams['facId'];

    if (isShow && isShow == 'true') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    this.serviceDepartService.getAllDepartService().subscribe(res => {
      this.serviceDepartList = res.msg;
    });

    this.orgSercice.getAllOrgList().subscribe(res => {
      this.orgList = res.msg;
    });

    if (id) {
      this.dailyMonitorSercice.getDailyMonitorById(id).subscribe(res => {
        this.data = res.msg;
        this.facSercice
          .getFacListByServiceid(this.data.serviceId)
          .subscribe(res => {
            this.facList = res.msg;
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
    this.dailyMonitorSercice
      .saveOrUpdateDailyMonitor(this.data)
      .subscribe(res => {
        if (res.code === 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/monitor/daily']);
        } else {
          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
  }

  close() {
    if (this.servicedepartId_Router) {
      this.router.navigate(
        ['/searchShow/integratedAuery/servicedepartSearch'],
        { queryParams: { id: this.servicedepartId_Router, idx: 3 } }
      );
    } else if (this.facId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/facSearch'], {
        queryParams: { id: this.facId_Router, idx: 5 }
      });
    } else {
      this.router.navigate(['/monitor/daily']);
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
    this.facSercice.getFacListByServiceid(value).subscribe(res => {
      this.facList = res.msg;
    });
  }

  // facChange(value: string): void {
  //   this.facSercice.getFacListByServiceid(this.data.serviceId).subscribe((res) => {
  //     this.facList = res.msg;
  //   })
  // }
}

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { CheckMonitorSercice } from 'src/app/services/monitor/check.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';

@Component({
  selector: 'app-check-add',
  templateUrl: './check-add.component.html',
  styleUrls: ['./check-add.component.scss']
})
export class CheckAddComponent implements OnInit {

  servicedepartId_Router: any = "";
  umineId_Router: any = "";
  equipdepartId_Router: any = "";

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  // fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  serviceDepartList: any = [];

  umineList: any = [];

  equipDepartList: any = [];

  orgList: any = [];

  checkData: any = [];

  departType: any = "";

  
  startValue: Date = null;
  endValue: Date = null;

  constructor(private msg: NzMessageService, private router: Router,
    private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private attachmentSercice: AttachmentSercice,
    private checkMonitorSercice: CheckMonitorSercice, private serviceDepartService: ServiceDepartService,
    private umineService: UmineService, private equipDepartService: EquipDepartService,
    private orgSercice: OrgSercice, ) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    this.servicedepartId_Router = this.ActivatedRoute.snapshot.queryParams["servicedepartId"];
    this.umineId_Router = this.ActivatedRoute.snapshot.queryParams["umineId"];
    this.equipdepartId_Router = this.ActivatedRoute.snapshot.queryParams["equipdepartId"];;

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }


    this.serviceDepartService.getAllDepartService().subscribe((res) => {

      this.serviceDepartList = res.msg;
    })

    this.umineService.getAllUmine().subscribe((res) => {

      this.umineList = res.msg;
    })

    this.equipDepartService.getAllEquipDepart().subscribe((res) => {

      this.equipDepartList = res.msg;
    })

    this.orgSercice.getOrgAndSastindList().subscribe((res) => {

      this.orgList = res.msg;
    })

    if (id) {
      this.checkMonitorSercice.getCheckMonitorById(id).subscribe((res) => {
        this.data = res.msg;
        if (this.data.serviceId) {
          this.departType = "fac";
        }
        if (this.data.umineId) {
          this.departType = "umine";
        }
        if (this.data.equipDepartId) {
          this.departType = "equip";
        }
        this.checkData[0]=this.data.startDate;
        this.checkData[1]=this.data.endDate;

        
        this.startValue = new Date(this.data.startDate);
        this.endValue = new Date(this.data.endDate);
      });

      // this.attachmentSercice.getFileListById(id).subscribe((res1) => {

      //   if (res1.msg.length > 0) {
      //     res1.msg.forEach(element => {
      //       this.fileList.push({
      //         response: {
      //           msg: element.fileinfoId
      //         },
      //         name: element.fileinfoClientFileName
      //       });
      //     });
      //   }
      // })


    } else {
      this.departType = "fac";
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

    // if (this.fileList.length > 0) {
    //   this.fileList.forEach(element => {
    //     this.data.attachmentList.push({ fileinfoId: element.response.msg });
    //   });
    // }

    this.data.modifyId = this.staffObj.id;
    if (this.departType == "fac") {
      this.data.umineId = "";
      this.data.equipDepartId = "";
    }

    if (this.departType == "umine") {
      this.data.serviceId = "";
      this.data.equipDepartId = "";
    }

    if (this.departType == "equip") {
      this.data.serviceId = "";
      this.data.umineId = "";
    }

    // if (this.checkData && this.checkData.length > 0) {
    //   if (this.checkData[0]) {
    //     this.data.startDate=this.checkData[0];
    //     //option.conditions.push({ key: "start_date", value: this.witness_date[0] })
    //   }

    //   if (this.checkData[1]) {
    //     this.data.endDate=this.checkData[1];
    //     //option.conditions.push({ key: "end_date", value: this.witness_date[1] })
    //   }
    // }

    this.checkMonitorSercice.saveOrUpdateCheckMonitor(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/monitor/check']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    if (this.servicedepartId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/servicedepartSearch'], { queryParams: { id: this.servicedepartId_Router, idx: 4 } });
    } else if (this.umineId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/umineSearch'], { queryParams: { id: this.umineId_Router, idx: 1 } });
    } else if (this.equipdepartId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/equipdepartSearch'], { queryParams: { id: this.equipdepartId_Router, idx: 5 } });
    } else {
      this.router.navigate(['/monitor/check']);
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

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }
}

import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from './../../../../../services/common/dictionary.service'
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SupervisionSercice } from 'src/app/services/supervision/supervisor.service';
import { OrgSercice } from 'src/app/services/supervision/org.service';

import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-supervisor-add',
  templateUrl: './supervisor-add.component.html',
  styleUrls: ['./supervisor-add.component.scss']
})
export class SupervisorAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  @ViewChild(AttachmentComponent)
  child:AttachmentComponent

  data: any = {};
  isSaving = false;
  isShow = false;
  sexValue: any = "1";

  fileList = [];

  dictionary: any = {};
  staffObj: any = {};
  orgList: any = {};

  dataSet: any = [];
  batchSearch: any = "";
  supervisorId: any = "";

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  isShowTrain = false;

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private supervisionSercice: SupervisionSercice, private ActivatedRoute: ActivatedRoute,
    private http: HttpClient, private attachmentSercice: AttachmentSercice, private orgSercice: OrgSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.isShowTrain = false;
    this.orgSercice.getAllOrgList().subscribe((res) => {
      if (res.code == 200) {
        this.orgList = [];
        res.msg.forEach(element => {
          this.orgList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    })

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.supervisorId = id;

    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    if (isShow && isShow == "true") {
      this.isShow = true;

    } else {
      this.isShow = false;
    }

    if (id) {
      //是否显示培训信息，修改监督员核查看的时候都需要显示
      this.isShowTrain = true;

      this.searchTrainRecords();

      this.supervisionSercice.getSupervisorById(id).subscribe((res) => {
        this.data = res.msg;
        this.sexValue = this.data.sex + "";
        this.staffObj.name = this.data.creatorName;
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
    }

  }

  searchTrainRecords() {

    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.batchSearch) {
      option.conditions.push({ key: "batch", value: this.batchSearch })
    }
    option.conditions.push({ key: "supervisorId", value: this.supervisorId });

    this.supervisionSercice.getTrainRecordList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  //身份证变化
  identityChange(params) {

    var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (reg.test(params)) {

      this.data.birthday = new Date(params.substring(6, 10), params.substring(10, 12) - 1, params.substring(12, 14), 8);
      if (parseInt(params.substr(16, 1)) % 2 == 1) {
        //男
        return this.sexValue = "1";
      } else {
        //女
        return this.sexValue = "0";
      }
    }
  }

  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.attachmentList = [];
    this.data.expireDate = "";

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
    this.data.sex = this.sexValue;

    this.supervisionSercice.saveOrUpdateSupervisionSupervisor(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/supersivion/supervisor']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/supersivion/supervisor']);
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

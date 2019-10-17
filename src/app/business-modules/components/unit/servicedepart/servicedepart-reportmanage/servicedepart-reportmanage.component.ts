import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-servicedepart-reportmanage',
  templateUrl: './servicedepart-reportmanage.component.html',
  styleUrls: ['./servicedepart-reportmanage.component.scss']
})
export class ServicedepartReportmanageComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  dataSet: any = [];
  data: any = {};
  serviceId: any = "";


  isVisible: any = false;
  isShow = false;

  //保存控制
  isSaving = false;

  modalTitle = "";
  okText = "";

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  fileList = [];

  selectId: any = "";
  canManage:any=false;

  constructor(private router: Router,
    private ActivatedRoute: ActivatedRoute, private msg: NzMessageService,
    private serviceDepartSercice: ServiceDepartService, private attachmentSercice: AttachmentSercice,
    private utilitiesSercice:UtilitiesSercice) { }

  ngOnInit() {

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.serviceId = id;

    this.canManage = this.utilitiesSercice.checkPermission("servicedepart:manage");

    this.search();
  }


  search() {

    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    option.conditions.push({ key: "serviceId", value: this.serviceId });

    this.serviceDepartSercice.getServiceAnnualReportList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );

    this.reset();
  }

  reset() {
    this.selectId = "";
    this.data = [];
    this.fileList = [];
  }

  add() {
    this.data = {};
    this.fileList = [];
    this.modalTitle = "添加年度报告信息";
    this.okText = "提交";
    this.isVisible = true;
    this.isShow = false;
    this.isSaving = false;
    this.selectId = "";
  }


  modify() {
    if (this.selectId) {
      this.modalTitle = "修改年度报告信息";
      this.okText = "提交";
      this.isVisible = true;
      this.isShow = false;
      this.isSaving = false;

      this.fileList = [];

      this.attachmentSercice.getFileListById(this.data.reportId).subscribe((res1) => {

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
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {
      this.serviceDepartSercice.deleteServiceAnnualReportByIds([this.selectId]).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else {
          this.msg.create("error", res.msg);
        }
      })
    } else {
      this.msg.create("warning", "请选择删除项");
    }
  }

  //查看与编辑
  show(param) {

    this.data = param;
    this.fileList = [];

    this.attachmentSercice.getFileListById(this.data.reportId).subscribe((res1) => {

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

    this.isVisible = false;
    this.isShow = true;
  }

  //添加的保存
  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.serviceId = this.serviceId;


    this.data.attachmentList = [];

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }


    this.serviceDepartSercice.saveOrUpdateServiceAnnualReport(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.search();
        this.isVisible = false;
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
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

  selectItem(data) {
    this.selectId = data.reportId;
    this.data = data;
  }

  handleOk(): void {
    this.isShow = false;
  }

  handleCancel(): void {
    this.isShow = false;
  }

  pageIndexChange(num) {
    this.pageIndex = num;
    this.search();
  }

  pageSizeChange(num) {
    this.pageSize = num;
    this.pageIndex = 1;
    this.search();
  }

}

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';

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

  //保存控制
  isSaving = false;
  isDisable = false;
  modalTitle = "";
  okText = "";

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  fileList = [];

  selectId: any = "";
  
  constructor(private router: Router,
    private ActivatedRoute: ActivatedRoute, private msg: NzMessageService,
    private serviceDepartSercice: ServiceDepartService, private attachmentSercice: AttachmentSercice) { }

  ngOnInit() {

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.serviceId = id;
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
  }

  add() {
    this.data = {};
    this.modalTitle = "添加年度报告信息";
    this.okText = "提交";
    this.isVisible = true;
    this.isSaving = false;
    this.isDisable=false;
    this.fileList=[];
  }

  //查看与编辑
  show(param, flag) {

    this.data = param;
    this.isDisable = flag;
    this.fileList=[];

    this.attachmentSercice.getFileListById(param.reportId).subscribe((res1) => {

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

    if (flag) {
      this.modalTitle = "查看年度报告信息";
      this.okText = null;
    } else {
      this.modalTitle = "编辑年度报告信息";
      this.okText = "提交";
    }

    this.isVisible = true;
  }


  delete(data) {

    this.serviceDepartSercice.deleteServiceAnnualReportByIds([data.reportId]).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })
  }

  close() {
    this.router.navigate(['/unit/servicedepart']);
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

}

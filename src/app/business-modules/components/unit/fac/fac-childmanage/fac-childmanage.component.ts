import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';

@Component({
  selector: 'app-fac-childmanage',
  templateUrl: './fac-childmanage.component.html',
  styleUrls: ['./fac-childmanage.component.scss']
})
export class FacChildmanageComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  dataSet: any = [];
  data: any = {};

  dataSetReport: any = [];
  dataReport: any = {};

  facId: any = "";

  isVisible: any = false;
  //保存控制
  isSaving = false;
  isDisable = false;
  modalTitle = "";
  okText = "";

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  isVisibleReport: any = false;
  //保存控制
  isSavingReport = false;
  isDisableReport = false;
  modalTitleReport = "";
  okTextReport = "";

  pageIndexReport: any = 1;
  totalCountReport: any;
  pageSizeReport: any = 10;

  fileList = [];
  dictionary: any = [];

  constructor(private router: Router,
    private ActivatedRoute: ActivatedRoute, private msg: NzMessageService, private facSercice: FacSercice,
    private attachmentSercice: AttachmentSercice, private dictionarySercice: DictionarySercice) { }

  ngOnInit() {

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.facId = id;
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.search();
    this.searchReport();
  }


  search() {

    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    option.conditions.push({ key: "facId", value: this.facId });

    this.facSercice.getFacImproveList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  searchReport() {

    var option = {
      pageNo: this.pageIndexReport,
      pageSize: this.pageSizeReport,
      conditions: []
    }

    option.conditions.push({ key: "facId", value: this.facId });

    this.facSercice.getFacReportList(option).subscribe(
      (data) => {
        this.dataSetReport = data.msg.currentList;
        this.totalCountReport = data.msg.recordCount;
      }
    );
  }

  add() {
    this.data = {};
    this.modalTitle = "添加安技改信息";
    this.okText = "提交";
    this.isVisible = true;
    this.isSaving = false;
  }

  addReport() {
    this.dataReport = {};
    this.modalTitleReport = "添加定期报告信息";
    this.okTextReport = "提交";
    this.isVisibleReport = true;
    this.isSavingReport = false;
  }

  //查看与编辑
  show(param, flag) {

    this.data = param;
    this.isDisable = flag;

    if (flag) {
      this.modalTitle = "查看安技改信息";
      this.okText = null;
    } else {
      this.modalTitle = "编辑安技改信息";
      this.okText = "提交";
    }

    this.isVisible = true;
  }

  //查看与编辑
  showReport(param, flag) {

    this.dataReport = param;
    this.isDisableReport = flag;

    this.attachmentSercice.getFileListById(param.id).subscribe((res1) => {

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
      this.modalTitleReport = "查看定期报告信息";
      this.okTextReport = null;
    } else {
      this.modalTitleReport = "编辑定期报告信息";
      this.okTextReport = "提交";
    }

    this.isVisibleReport = true;
  }

  delete(data) {

    this.facSercice.deleteFacImproveByIds([data.id]).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", res.msg);
        this.search();
      } else {
        this.msg.create("error", res.msg);
      }
    })
  }

  deleteReport(data) {

    this.facSercice.deleteFacReportByIds([data.id]).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", res.msg);
        this.searchReport();
      } else {
        this.msg.create("error", res.msg);
      }
    })
  }

  close() {
    this.router.navigate(['/unit/fac']);
  }

  //添加的保存
  save() {

    this.isSaving = true;
    this.data.facId = this.facId;
    if (!this.data.id) {
      this.facSercice.saveOrUpdateFacImprove(this.data).subscribe((res) => {
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
  }

  saveReport() {

    this.isSaving = true;
    this.dataReport.facId = this.facId;

    this.dataReport.attachmentList = [];

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.dataReport.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    if (!this.dataReport.id) {
      this.facSercice.saveOrUpdateFacReport(this.dataReport).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.searchReport();
          this.isVisibleReport = false;
        } else {

          this.msg.create('error', '保存失败');
        }

        this.isSavingReport = false;
      });
    }
  }
 
}

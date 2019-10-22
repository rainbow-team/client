import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';

@Component({
  selector: 'app-fac-add',
  templateUrl: './fac-add.component.html',
  styleUrls: ['./fac-add.component.scss']
})
export class FacAddComponent implements OnInit {

  @Input() facSearchId: any = "";
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;

  isShow = false;
  isAdd = false;

  fileList = [];

  dictionary: any = {};
  staffObj: any = {};
  ServiceDepartList: any = [];

  sFList: any = [
    { id: 1, value: "是" },
    { id: 0, value: "否" },
  ];

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;
  facId: any = "";
  dataSet: any = [];

  pageIndexReport: any = 1;
  totalCountReport: any;
  pageSizeReport: any = 10;
  dataSetReport: any = [];


  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private serviceDepartService: ServiceDepartService, private facSercice: FacSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    this.serviceDepartService.getAllDepartService().subscribe((res) => {
      if (res.code == 200) {
        this.ServiceDepartList = [];
        res.msg.forEach(element => {
          this.ServiceDepartList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    });


    if(this.facSearchId){
      id = this.facSearchId;
      isShow = "true";
    }
    
    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

   

    if (id) {

      // if (this.isShow) {
      //   this.facId = id;
      //   //this.search();
      //   //this.searchReport();
      // }
      this.facSercice.getFacById(id).subscribe((res) => {
        this.data = res.msg;
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
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
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

  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.attachmentList = [];

    if (this.fileList.length > 0) {

      if (!this.fileList[this.fileList.length-1].response) {

        this.msg.create('warning', '附件还未上传完毕,请稍等');
        this.isSaving = false;
        return;
      }
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.facSercice.saveOrUpdateFac(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/unit/fac']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/unit/fac']);
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

import { Component, OnInit, ViewChildren, QueryList, Input, ViewChild } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-umineplace-add',
  templateUrl: './umineplace-add.component.html',
  styleUrls: ['./umineplace-add.component.scss']
})
export class UmineplaceAddComponent implements OnInit {

  @Input() umineplaceSearchId: any = "";

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  @ViewChild(AttachmentComponent)
  child:AttachmentComponent


  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};
  umineList: any = [];

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;
  uminePlaceId: any = "";
  dataSet: any = [];

  sFList: any = [
    { id: 1, value: "是" },
    { id: 0, value: "否" },
  ];

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private umineSercice: UmineService, private uminePlaceService: UminePlaceService) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.umineSercice.getAllUmine().subscribe((res) => {
      if (res.code == 200) {
        this.umineList = [];
        res.msg.forEach(element => {
          this.umineList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    })

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    if(this.umineplaceSearchId){
      id = this.umineplaceSearchId;
      isShow = "true";
    }

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (id) {

      if (this.isShow) {
        this.uminePlaceId = id;
        //this.search();
      }

      this.uminePlaceService.getUminePlaceById(id).subscribe((res) => {
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

    option.conditions.push({ key: "uminePlaceId", value: this.uminePlaceId });

    this.uminePlaceService.getUminePlaceImproveList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
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
    this.uminePlaceService.saveOrUpdateUminePlace(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/unit/umineplace']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/unit/umineplace']);
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

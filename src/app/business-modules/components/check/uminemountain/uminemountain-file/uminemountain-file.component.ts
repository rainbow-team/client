import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UminemountainCheckSercice } from 'src/app/services/check/uminemountain.service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-uminemountain-file',
  templateUrl: './uminemountain-file.component.html',
  styleUrls: ['./uminemountain-file.component.scss']
})
export class UminemountainFileComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  uminemountainId: any = "";
  dictionary: any = [];

  pageIndex: any = 1;
  pageSize: any = 10;
  totalCount: any;

  dataSet: any = [];
  data: any = {};

  selectId:any="";
  fileList = [];

  modalTitle:any="";
  okText:any="";
  isVisible: any = false;
  isShow:any=false;
  isSaving:any=false;

  // file_name:any="";
  typeIds:any=[];
  fileDate:any=[];
  canManage:any=false;

  constructor(private router: Router,
    private ActivatedRoute: ActivatedRoute, private msg: NzMessageService, private uminemountainCheckSercice: UminemountainCheckSercice,
    private attachmentSercice: AttachmentSercice, private dictionarySercice: DictionarySercice,
    private utilitiesSercice:UtilitiesSercice) { }

  ngOnInit() {
    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.uminemountainId = id;
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.canManage = this.utilitiesSercice.checkPermission('check:uminemountain:manage');
    this.search();
  }

  
  search() {

    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    option.conditions.push({ key: "uminemountainId", value: this.uminemountainId });

    // if (this.file_name) {
    //   option.conditions.push({ key: "file_name", value: this.file_name })
    // }

    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: [this.typeIds] })
    }

    if (this.fileDate && this.fileDate.length > 0) {
      if (this.fileDate[0]) {
        option.conditions.push({
          key: 'start_date',
          value: this.fileDate[0]
        });
      }

      if (this.fileDate[1]) {
        option.conditions.push({
          key: 'end_date',
          value: this.fileDate[1]
        });
      }
    }

    this.uminemountainCheckSercice.getUmineMountainFileCheckList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );

  }

  reset() {
    this.selectId = "";
    this.data = [];
    this.fileList = [];
    // this.file_name = "";
    this.typeIds = [];
    this.fileDate = [];
  }

  add() {
    this.data = {};
    this.fileList=[];
    this.modalTitle = "添加审查文件";
    this.okText = "提交";
    this.isVisible = true;
    this.isShow=false;
    this.isSaving = false;
    this.selectId="";

  }

  modify(){
    if (this.selectId) {
      this.modalTitle = "修改审查文件";
      this.okText = "提交";
      this.isVisible = true;
      this.isShow=false;
      this.isSaving = false;

      this.fileList=[];

      this.attachmentSercice.getFileListById(this.data.id).subscribe((res1) => {

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
      this.uminemountainCheckSercice.deleteUmineMountainFileCheckByIds([this.selectId]).subscribe((res) => {
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

    this.fileList=[];
    
    this.data = param;

    this.attachmentSercice.getFileListById(this.data.id).subscribe((res1) => {

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

  save() {

    if (!this.FormValidation()) {
      return;
    }


    this.isSaving = true;
    this.data.checkUmineMountainId = this.uminemountainId;

    this.data.attachmentList = [];

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

      this.uminemountainCheckSercice.saveOrUpdateUmineMountainFileCheck(this.data).subscribe((res) => {
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

  selectItem(data) {
    this.selectId = data.id;
    this.data = data;
  }

  handleOk(): void {
    this.isShow = false;
  }

  handleCancel(): void {
    this.isShow = false;
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

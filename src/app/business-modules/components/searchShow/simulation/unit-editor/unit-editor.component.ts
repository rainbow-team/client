import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { UnithotregionService } from 'src/app/services/unit/unithotregion.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { d } from '@angular/core/src/render3';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';

@Component({
  selector: 'app-unit-editor',
  templateUrl: './unit-editor.component.html',
  styleUrls: ['./unit-editor.component.scss']
})
export class UnitEditorComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;
  title = '';

  dataSet: any = [];
  selectId: any = '';
  subject: any = {};

  province = '';
  unitId = '';

  unit_subjects: any = [];

  isEditorVisible = false;
  isEditorLoading = false;
  unitType: any;
  fileList = [];
  markerId: any;
  isModify: boolean;

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private unithotregionService: UnithotregionService,
    private facSercice: FacSercice,
    private uminePlaceService: UminePlaceService
  ) {}

  ngOnInit() {
    this.markerId = this.activatedRoute.snapshot.queryParams['mid'];
    this.unitId = this.activatedRoute.snapshot.queryParams['uid'];
    this.province = this.activatedRoute.snapshot.queryParams['province'];
    this.unitType = this.activatedRoute.snapshot.queryParams['unitType'];
    if (this.unitType === '0') {
      //营运单位
      this.facSercice.getFacListByServiceid(this.unitId).subscribe(res => {
        this.unit_subjects = res.msg;
      });
    }
    if (this.unitType === '1') {
      this.uminePlaceService
        .getUmineplaceListByUmineId(this.unitId)
        .subscribe(res => {
          this.unit_subjects = res.msg;
        });
    }
    this.search();
  }
  search() {
    let option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };
    option.conditions.push({
      key: 'unitId',
      value: this.unitId
    });
    option.conditions.push({
      key: 'markerId',
      value: this.markerId
    });
    this.unithotregionService.getUnitHotRegionList(option).subscribe(res => {
      this.dataSet = res.msg.currentList;
      this.totalCount = res.msg.recordCount;
    });
  }

  reset() {
    this.selectId = '';
  }

  add() {
    this.isEditorVisible = true;
    this.title = '添加';
    this.isModify = false;
    this.subject = {};
  }
  editorOk() {
    if (!this.FormValidation()) {
      return;
    }
    this.isEditorLoading = true;
    if (this.fileList.length > 0) {
      this.subject.picId = this.fileList[0].response.msg;
      this.subject.attachmentList = [];
      this.subject.attachmentList.push({
        fileinfoId: this.fileList[0].response.msg
      });
    }
    this.subject.subjectName = this.unit_subjects.filter(
      sub => sub.id === this.subject.subjectId
    )[0].name;
    this.subject.unitId = this.unitId;
    this.subject.addressId = this.markerId;
    if (this.isModify) {
      //修改流程，不需要判断核设施是否 存在
      this.unithotregionService
        .saveOrUpdateUnitHotRegion(this.subject)
        .subscribe(res1 => {
          this.isEditorLoading = false;
          this.isEditorVisible = false;
          this.subject = {};
          this.fileList = [];
          if (res1.code === 200) {
            this.msg.create('success', '保存成功');
            this.search();
          } else {
            this.msg.create('error', '保存失败');
          }
        });
    } else {
      this.unithotregionService
        .isUnitHotRegionExist(this.subject.subjectId)
        .subscribe(res => {
          if (res.code === 200) {
            this.unithotregionService
              .saveOrUpdateUnitHotRegion(this.subject)
              .subscribe(res1 => {
                this.isEditorLoading = false;
                this.isEditorVisible = false;
                this.subject = {};
                this.fileList = [];
                if (res1.code === 200) {
                  this.msg.create('success', '保存成功');
                  this.search();
                } else {
                  this.msg.create('error', '保存失败');
                }
              });
          } else {
            this.msg.create('error', '保存失败，核设施/铀尾矿渣库已经存在。');
            this.isEditorLoading = false;
          }
        });
    }
  }
  editorCancel() {
    this.isEditorVisible = false;
  }

  modify() {
    if (this.selectId) {
      this.title = '修改';
      this.isModify = true;
      this.isEditorVisible = true;
      this.unithotregionService
        .getUnitHotRegionById(this.selectId)
        .subscribe(res1 => {
          this.subject = res1.msg;
        });

      this.attachmentSercice.getFileListById(this.selectId).subscribe(res1 => {
        if (res1.msg.length > 0) {
          res1.msg.forEach(element => {
            this.fileList = [];
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
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.unithotregionService
        .deleteUnitHotRegionById(this.selectId)
        .subscribe(res => {
          if (res.code === 200) {
            this.msg.create('success', '删除成功');
            this.search();
          } else {
            this.msg.create('error', '删除失败');
          }
        });
    } else {
      this.msg.create('warning', '请选择删除项');
    }
  }

  selectItem(data) {
    this.selectId = data.id;
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

  back() {
    this.router.navigate(['/searchShow/simulation'], {
      queryParams: { id: this.province }
    });
  }

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

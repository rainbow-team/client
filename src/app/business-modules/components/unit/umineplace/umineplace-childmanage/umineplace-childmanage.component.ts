import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';

@Component({
  selector: 'app-umineplace-childmanage',
  templateUrl: './umineplace-childmanage.component.html',
  styleUrls: ['./umineplace-childmanage.component.scss']
})
export class UmineplaceChildmanageComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  dataSet: any = [];
  data: any = {};
  uminePlaceId: any = "";


  isVisible: any = false;

  //保存控制
  isSaving = false;
  isDisable = false;
  modalTitle = "";
  okText = "";

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  constructor(private router: Router,
    private ActivatedRoute: ActivatedRoute, private msg: NzMessageService, private uminePlaceService: UminePlaceService) { }

  ngOnInit() {

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.uminePlaceId = id;
    this.search();
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

  add() {
    this.data = {};
    this.modalTitle = "添加安技改信息";
    this.okText = "提交";
    this.isVisible = true;
    this.isSaving = false;
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


  delete(data) {

    this.uminePlaceService.deleteUminePlaceImproveByIds([this.data.id]).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })
  }

  close() {
    this.router.navigate(['/unit/umineplace']);
  }

  //添加的保存
  save() {

    if (!this.FormValidation()) {
      return;
    }
    
    this.isSaving = true;
    this.data.uminePlaceId = this.uminePlaceId;
    if (!this.data.id) {
      this.uminePlaceService.saveOrUpdateUminePlaceImprove(this.data).subscribe((res) => {
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

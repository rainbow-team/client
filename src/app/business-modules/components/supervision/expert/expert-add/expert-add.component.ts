import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router,ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ExpertSercice } from 'src/app/services/supervision/expert.service';

@Component({
  selector: 'app-expert-add',
  templateUrl: './expert-add.component.html',
  styleUrls: ['./expert-add.component.scss']
})
export class ExpertAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isShow = false;
  fileList = [];
  sexValue: any = "";

  dictionary: any = {};
  staffObj: any = {};

  age:any="";

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private expertSercice: ExpertSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (id) {
      this.expertSercice.getExpertById(id).subscribe((res) => {
        this.data = res.msg;
        this.sexValue = this.data.sex + "";
        this.getAge();
      });

    } else {
      this.data.createDate = new Date();
      this.data.creatorId = this.staffObj.id;
    }

  }

  //身份证变化
  identityChange(params) {

    var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (reg.test(params)) {
  
        this.data.birthday = new Date(params.substring(6, 10), params.substring(10, 12) - 1, params.substring(12, 14),8);
        if (parseInt(params.substr(16, 1)) % 2 == 1) {
          //男
          return this.sexValue = "1";
        } else {
          //女
          return this.sexValue = "0";
        }
      }
  }

  getAge() {
    let nowDateTime = new Date();
    let birthdayDate = new Date(this.data.birthday);
    let age = nowDateTime.getFullYear() - birthdayDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthdayDate.getMonth() || (nowDateTime.getMonth() == birthdayDate.getMonth() && nowDateTime.getDate() < birthdayDate.getDate())) {
      age--;
    }
    this.age = age;
  }

  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;

    this.data.modifyId = this.staffObj.id;
    this.data.sex = this.sexValue;
    this.expertSercice.saveOrUpdateExpert(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/supersivion/expert']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/supersivion/expert']);
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

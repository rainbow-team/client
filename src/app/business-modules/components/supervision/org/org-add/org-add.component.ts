import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';

@Component({
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.scss']
})
export class OrgAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  dictionary: any = {};
  staffObj: any = {};
  data: any = {};
  nature: any = [];
  isShow: any = false;
  isSaving: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private orgSercice: OrgSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute) { }

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
      this.orgSercice.getOrgById(id).subscribe((res) => {
        if (res.code == 200) {
          this.data = res.msg;
          this.nature=this.data.typeIds
        }
      });
    } else {
      this.data.createrId = this.staffObj.id;
    }
  }

  save() {
    if (!this.FormValidation()) {
      return;
    }

    if (!this.nature || this.nature.length == 0) {
      this.msg.create('warning', '机构性质必选');
      return;
    }

    this.isSaving = true;
    this.data.modifyId = this.staffObj.id;
    this.data.nature = [];
    this.nature.forEach(element => {
      this.data.nature.push({ id: element });
    });

    this.orgSercice.saveOrUpdateOrg(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/supersivion/org']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }


  close() {
    this.router.navigate(['/supersivion/org']);
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

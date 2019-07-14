import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router,ActivatedRoute} from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SastindSercice } from 'src/app/services/supervision/sastind.service';

@Component({
  selector: 'app-sastind-add',
  templateUrl: './sastind-add.component.html',
  styleUrls: ['./sastind-add.component.scss']
})
export class SastindAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isDisable = false;
  fileList = [
  ];

  dictionary: any = {};
  staffObj: any = {};

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute, private sastindSercice: SastindSercice) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let flag = this.ActivatedRoute.snapshot.queryParams["flag"];

    if (flag && flag == "true") {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }

    if (id) {
      this.sastindSercice.getSastindById(id).subscribe((res) => {
        this.data = res.msg;
      });
    } else {
      this.data.createDate = new Date();
      this.data.creatorId = this.staffObj.id;
    }

  }

  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.modifyId = this.staffObj.id;

    this.sastindSercice.saveOrUpdateSastind(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/supersivion/sastind']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/supersivion/sastind']);
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

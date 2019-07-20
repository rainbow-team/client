import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { GroupService } from 'src/app/services/unit/group.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isDisable = false;
  fileList = [
  ];

  dictionary: any = {};
  staffObj: any = {};

  serviceDepartNum: any = 0;
  umineNum: any = 0;

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private groupService: GroupService) { }


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
      this.groupService.getGroupById(id).subscribe((res) => {
        this.data = res.msg;
        this.serviceDepartNum = res.msg.serviceDepartNum;
        this.umineNum = res.msg.umineNum;
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
    this.groupService.saveOrUpdateGroup(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/unit/group']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/unit/group']);
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

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ProducetrainSercice } from 'src/app/services/supervision/producetrain.service';

@Component({
  selector: 'app-producetrain-add',
  templateUrl: './producetrain-add.component.html',
  styleUrls: ['./producetrain-add.component.scss']
})
export class ProducetrainAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isShow = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private producetrainSercice: ProducetrainSercice) { }


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
      this.producetrainSercice.getProduceTrainRecordById(id).subscribe((res) => {
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
      this.data.createDate = new Date();
      this.data.creatorId = this.staffObj.id;
    }

  }

  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.attachmentList = [];

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.producetrainSercice.saveOrUpdateProducetrain(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/supersivion/producetrain']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/supersivion/producetrain']);
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

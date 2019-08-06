import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { GroupService } from 'src/app/services/unit/group.service';

@Component({
  selector: 'app-servicedepart-add',
  templateUrl: './servicedepart-add.component.html',
  styleUrls: ['./servicedepart-add.component.scss']
})
export class ServicedepartAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  @Input() servicedepartId = "";

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};
  groupList: any = [];

  facNum: any = 0;

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;
  serviceId: any = "";
  dataSet: any = [];

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice, private groupService: GroupService, private serviceDepartSercice: ServiceDepartService) { }


  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.groupService.getAllGroup().subscribe((res) => {
      if (res.code == 200) {
        this.groupList = [];
        res.msg.forEach(element => {
          this.groupList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    })

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    if(this.servicedepartId){
      id = this.servicedepartId;
      isShow = "true";
    }

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (id) {

      if (this.isShow) {
        this.serviceId = id;
        this.search();
      }

      this.serviceDepartSercice.getServiceDepartById(id).subscribe((res) => {
        this.data = res.msg;
        this.facNum = this.data.facNum;
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

    option.conditions.push({ key: "serviceId", value: this.serviceId });

    this.serviceDepartSercice.getServiceAnnualReportList(option).subscribe(
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

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.serviceDepartSercice.saveOrUpdateServiceDepart(this.data).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');

        this.router.navigate(['/unit/servicedepart']);
      } else {

        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });

  }

  close() {
    this.router.navigate(['/unit/servicedepart']);
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

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { EquipService } from 'src/app/services/permit/equip.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';

@Component({
  selector: 'app-equip-add',
  templateUrl: './equip-add.component.html',
  styleUrls: ['./equip-add.component.scss']
})
export class EquipAddComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isDisable = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  unitEquipDeparts: any = [];
  serviceDeparts: any = [];
  unitFacs: any = [];

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private serviceDepartService: ServiceDepartService,
    private equipDepartService: EquipDepartService,
    private facSercice: FacSercice,
    private equipService: EquipService
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams['id'];
    let flag = this.ActivatedRoute.snapshot.queryParams['flag'];

    if (flag && flag == 'true') {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }

    this.equipDepartService.getAllEquipDepart().subscribe(res => {
      this.unitEquipDeparts = res.msg;
    });

    this.serviceDepartService.getAllDepartService().subscribe(res => {
      this.serviceDeparts = res.msg;
    });

    if (id) {
      this.equipService.getEquipById(id).subscribe(res => {
        this.data = res.msg;
        this.facSercice
          .getFacListByServiceid(this.data.serviceId)
          .subscribe(res1 => {
            this.unitFacs = res1.msg;
          });
      });

      this.attachmentSercice.getFileListById(id).subscribe(res1 => {
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
    this.data.attachmentList = [];

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    this.data.modifyId = this.staffObj.id;
    this.equipService.saveOrUpdateEquip(this.data).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/permit/equip']);
      } else {
        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });
  }

  close() {
    this.router.navigate(['/permit/equip']);
  }

  //根据营运单位获取对应的核设施
  changeunitFacs(serviceid) {
    this.facSercice.getFacListByServiceid(serviceid).subscribe(res => {
      this.unitFacs = res.msg;
    });
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

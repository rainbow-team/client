import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService, NzTreeComponent } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { PermitFacSercice } from 'src/app/services/permit/permit.fac.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';
import { UserService } from 'src/app/services/system/user.service';
import { PermitPublishScopeService } from 'src/app/services/permit/permit.publish.service';
import { OrgService } from 'src/app/services/system/org.service';
import { TreeHelper } from 'src/app/utilities/treeHelper';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-permit-fac-add',
  templateUrl: './fac-add.component.html',
  styleUrls: ['./fac-add.component.scss'],
})
export class PermitFacAddComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  @ViewChild(AttachmentComponent)
  child: AttachmentComponent;

  facId_Router: any = '';

  data: any = {};
  isSaving = false;
  isShow = false;
  isAdd = false;
  fileList = [];

  dictionary: any = {};
  staffObj: any = {};

  serviceDepartList: any = [];

  facList: any = [];
  userNodes: any = []; // 树节点数据源
  allUser: any = []; // 全部用户
  checkedUsers: any = []; // 知悉用户id列表
  nodesList: any; // 用户及机构的混合列表，用户树基于该列表构建

  constructor(
    private msg: NzMessageService,
    private router: Router,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,
    private activatedRoute: ActivatedRoute,
    private attachmentSercice: AttachmentSercice,
    private permit_FacSercice: PermitFacSercice,
    private serviceDepartService: ServiceDepartService,
    private facSercice: FacSercice,
    private permitPublishScopeService: PermitPublishScopeService,
    private userService: UserService,
    private orgService: OrgService,
    private treeHelper: TreeHelper
  ) {}

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    let id = this.activatedRoute.snapshot.queryParams['id'];
    let isShow = this.activatedRoute.snapshot.queryParams['isShow'];

    this.facId_Router = this.activatedRoute.snapshot.queryParams['facId'];

    if (isShow && isShow === 'true') {
      this.isShow = true; // 查看模式
    } else {
      this.isShow = false; // 编辑模式
    }

    this.serviceDepartService.getAllDepartService().subscribe((res) => {
      this.serviceDepartList = res.msg;
    });

    // 新增或编辑
    if (id) {
      // 并行调用接口
      forkJoin([this.getData(id), this.getOrgsAndUsers(), this.permitPublishScopeService.getListByPermitId(id)]).subscribe(
        (result) => {
          this.facList = result[0].msg;
          this.allUser = result[1].msg;

          // 知悉范围
          this.checkedUsers = result[2].msg.map((ps) => ps.userId);

          this.pushUsersToList(result[1].msg, this.isShow);
          // 生成树
          this.userNodes = this.treeHelper.generateTree(this.nodesList, '0');
          // 权限检查（是否可选）
          this.nodesList.forEach((node) => {
            if (node.isUser) {
              node.disableCheckbox = !this.checkPermission(+this.data.securityLevel, +node.securityLevel);
            }
          });
        }
      );

      this.attachmentSercice.getFileListById(id).subscribe((res1) => {
        if (res1.msg.length > 0) {
          res1.msg.forEach((element) => {
            this.fileList.push({
              response: {
                msg: element.fileinfoId,
              },
              name: element.fileinfoClientFileName,
            });
          });
        }
      });
    } else {
      // “添加”模式
      this.isAdd = true;
      this.data.createDate = new Date();
      this.data.creatorId = this.staffObj.id;
      this.getOrgsAndUsers().subscribe((res) => {
        this.pushUsersToList(res.msg, false);
        // 生成树
        this.userNodes = this.treeHelper.generateTree(this.nodesList, '0');
      });
    }
  }

  // 判断用户是否有权限“知悉”信息
  checkPermission(infoSecurity, userSucurity) {
    // 绝密信息，无权查看
    if (infoSecurity === 192) {
      return userSucurity >= 3;
    } else if (infoSecurity === 128) {
      // 机密信息，'重要'用户才有权查看
      return userSucurity >= 2;
    } else {
      return false;
    }
  }

  /**
   * @description: 串联机构和用户接口,获取全部组织机构和用户，用于按机构构建用户树   *
   * @Date: 2021-05-18 15:47:35
   */
  getOrgsAndUsers() {
    return this.orgService.getAllOrganization().pipe(
      mergeMap((res: any) => {
        console.log('getAllOrganization,data:' + res.msg);
        this.nodesList = res.msg.map((org) => {
          return { title: org.name, key: org.id, parentId: org.parentId, isUser: false, checked: false, disabled: false };
        });
        return this.userService.getAllUser().pipe((data) => {
          return data;
        });
      })
    );
  }

  /**
   * @description: 根据id获取业务数据（此处为核设施许可数据）
   * @param {string} id
   * @return {*}
   * @Date: 2021-05-18 15:49:19
   */
  getData(id) {
    return this.permit_FacSercice.getFacPermitById(id).pipe(
      mergeMap((res: any) => {
        this.data = res.msg;
        return this.facSercice.getFacListByServiceid(this.data.serviceId).pipe((data) => {
          return data;
        });
      })
    );
  }
  /**
   * @description:添加用户数据并生成树
   * @param {*} msg
   * @param {*} disabled 是否可点击
   * @return {void}
   */
  pushUsersToList(msg, disabled) {
    // 添加用户数据到列表
    msg.forEach((user) => {
      this.nodesList.push({
        title: user.username,
        key: user.id,
        parentId: user.orgId,
        isUser: true,
        checked: false,
        disabled: disabled,
        securityLevel: user.securityLevel,
        securityLevelValue: user.securityLevelValue,
      });
    });
  }

  // 保密等级切换处理函数，重置知悉范围并设置CheckBox状态
  securityLevelChange(value) {
    this.checkedUsers = []; // 切换密级，知悉范围置空
    if (value > 64) {
      this.nodesList.forEach((node) => {
        if (node.isUser) {
          node.disableCheckbox = !this.checkPermission(+value, +node.securityLevel);
        }
      });
    }
  }

  // 保存
  save() {
    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.attachmentList = [];

    let fileList = this.child.fileList;
    if (fileList.length > 0) {
      if (!fileList[fileList.length - 1].response) {
        this.msg.create('warning', '附件还未上传完毕,请稍等');
        this.isSaving = false;
        return;
      }
      fileList.forEach((element) => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    // 过滤树节点，获取选中且是用户的节点
    let pUsers = this.nodesList
      .filter((node) => node.isUser && node.checked)
      .map((el) => {
        return el.key;
      });

    this.data.publishScopes = pUsers;

    this.data.modifyId = this.staffObj.id;
    this.permit_FacSercice.saveOrUpdateFac(this.data).subscribe((res) => {
      if (res.code === 200) {
        this.msg.create('success', '保存成功');
        this.router.navigate(['/permit/fac']);
      } else {
        this.msg.create('error', '保存失败');
      }

      this.isSaving = false;
    });
  }

  // 关闭
  close() {
    if (this.facId_Router) {
      this.router.navigate(['/searchShow/integratedAuery/facSearch'], { queryParams: { id: this.facId_Router, idx: 1 } });
    } else {
      this.router.navigate(['/permit/fac']);
    }
  }

  // 表单手动触发验证
  FormValidation() {
    let isValid = true;
    this.directives.forEach((d) => {
      if (!d.validationValue()) {
        isValid = false;
      }
    });
    return isValid;
  }

  serviceDepartChange(value: string): void {
    this.facSercice.getFacListByServiceid(value).subscribe((res) => {
      this.facList = res.msg;
    });
  }
}

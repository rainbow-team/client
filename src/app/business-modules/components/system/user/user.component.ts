import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { RoleService } from 'src/app/services/system/role.service';
import { OrgService } from 'src/app/services/system/org.service';
import { UserService } from 'src/app/services/system/user.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];
  allRoles: any = [];
  currentUser: any = {};
  allOrgList: any = [];
  orgTreeNodes: any = [];

  isVisible = false;
  isOkLoading = false;
  title: string;
  isDisable: boolean;
  username: string;
  realname: string;
  department: string;
  selectId: any = '';
  isView = false; //查看操作标志
  canManage: any = false;

  constructor(
    private msg: NzMessageService,
    private roleService: RoleService,
    private orgService: OrgService,
    private userService: UserService,
    private staffSercice: StaffSercice,
    private utilitiesSercice: UtilitiesSercice
  ) {}

  ngOnInit() {
    this.staffObj = this.staffSercice.getStaffObj();
    this.canManage = this.utilitiesSercice.checkPermission(
      'monitor:daily:manage'
    );
    this.search();
  }

  search() {
    let option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    if (this.username) {
      option.conditions.push({ key: 'username', value: this.username });
    }
    if (this.department) {
      option.conditions.push({ key: 'department', value: this.department });
    }
    if (this.realname) {
      option.conditions.push({ key: 'realname', value: this.realname });
    }

    this.userService.getUserList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });

    this.orgService.getAllOrganization().subscribe(data => {
      // this.dataSet = data.msg;
      this.allOrgList = data.msg;
      this.orgTreeNodes = this.generateTree2(data.msg, '0');
    });

    this.roleService.getAllRoles().subscribe(data => {
      this.allRoles = data.msg;
    });
  }

  generateTree2(data, parentId) {
    const itemArr: any[] = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (node.parentId == parentId) {
        let newNode: any;
        newNode = {
          key: node.id,
          title: node.name
        };
        let children = this.generateTree2(data, node.id);
        if (children.length > 0) {
          newNode.children = children;
        } else {
          newNode.isLeaf = true;
        }
        itemArr.push(newNode);
      }
    }
    return itemArr;
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

  reset() {
    this.username = '';
    this.department = '';
    this.realname = '';
  }

  add() {
    this.title = '添加用户';
    this.currentUser = {};
    this.currentUser.creatorId = this.staffObj.id;
    this.isVisible = true;
    this.isDisable = false;
  }

  show(item) {
    this.isVisible = true;
    this.isView = true;
    this.title = '查看用户信息';
    this.currentUser = item;
    this.isDisable = true;
    this.userService.getUserWithRoleByUserId(item.id).subscribe(data => {
      const roleList: any = [];
      for (let i = 0; i < data.msg.roleList.length; i++) {
        roleList.push(data.msg.roleList[i].id);
      }
      this.currentUser.roleList = roleList;
    });
  }

  modify() {
    if (this.selectId) {
      this.isDisable = false;
      this.isVisible = true;
      this.title = '编辑用户信息';
      this.currentUser.modifyId = this.staffObj.id;
      this.userService
        .getUserWithRoleByUserId(this.currentUser.id)
        .subscribe(data => {
          const roleList: any = [];
          for (let i = 0; i < data.msg.roleList.length; i++) {
            roleList.push(data.msg.roleList[i].id);
          }
          this.currentUser.roleList = roleList;
        });
    } else {
      this.msg.create('warning', '请选择修改项');
    }
  }

  delete() {
    if (this.selectId) {
      this.userService.deleteUserByIds([this.selectId]).subscribe(res => {
        if (res.code === 200) {
          this.msg.create('success', '删除成功');
          this.search();
        } else if (res.code === 500) {
          this.msg.create('warning', res.msg);
        } else {
          this.msg.create('error', '删除失败');
        }
      });
    } else {
      this.msg.create('warning', '请选择删除项');
    }
  }

  handleOk(): void {
    //查看详情操作直接返回
    if (this.isView) {
      this.isView = false;
      this.isVisible = false;
      return;
    }
    if (!this.FormValidation()) {
      return;
    }
    this.isOkLoading = true;
    for (let i = 0; i < this.currentUser.roleList.length; i++) {
      let id = this.currentUser.roleList[i];
      this.currentUser.roleList[i] = this.allRoles.find(
        myObj => myObj.id === id
      );
    }
    this.userService.saveOrUpdateUser(this.currentUser).subscribe(res => {
      this.isOkLoading = false;
      this.isVisible = false;
      this.currentUser = {};
      if (res.code === 200) {
        this.msg.create('success', '保存成功');
        this.search();
      } else {
        this.msg.create('error', '保存失败');
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isDisable = false;
    this.isView = false;
  }

  selectItem(data) {
    this.currentUser = data;
    this.selectId = data.id;
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

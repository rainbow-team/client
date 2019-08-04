import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { RoleService } from 'src/app/services/system/role.service';
import { OrgService } from 'src/app/services/system/org.service';
import { UserService } from 'src/app/services/system/user.service';

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

  constructor(
    private msg: NzMessageService,
    private roleService: RoleService,
    private orgService: OrgService,
    private userService: UserService,
    private staffSercice: StaffSercice
  ) {}

  ngOnInit() {
    this.staffObj = this.staffSercice.getStaffObj();
    this.search();
  }

  search() {
    let option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    // if (this.name) {
    //   option.conditions.push({ key: 'name', value: this.name });
    // }

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
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      if (node.parentId === parentId) {
        let newNode: any;
        newNode = {
          key: node.id,
          title: node.name,
          children: this.generateTree2(data, node.id)
        };
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
    // this.name = '';
  }

  add() {
    // this.router.navigate(['/unit/group/add']);
  }

  show(item, flag) {
    this.isVisible = true;
    if (flag) {
      this.currentUser = item;
      this.userService.getUserWithRoleByUserId(item.id).subscribe(data => {
        const roleList: any = [];
        for (let i = 0; i < data.msg.roleList.length; i++) {
          roleList.push(data.msg.roleList[i].id);
        }
        this.currentUser.roleList = roleList;
      });
    } else {
      this.currentUser = {};
    }
  }

  delete(item) {
    this.userService.deleteUserByIds([item.id]).subscribe(res => {
      if (res.code === 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else if (res.code === 500) {
        this.msg.create('warning', res.msg);
      } else {
        this.msg.create('error', '删除失败');
      }
    });
  }

  handleOk(): void {
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

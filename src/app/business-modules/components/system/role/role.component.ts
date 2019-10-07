import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { RoleService } from 'src/app/services/system/role.service';
import { MenuService } from 'src/app/services/system/menu.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];
  currentRole: any = {};
  allMenuList: any = [];
  menuTreeNodes: any = [];

  isVisible = false;
  isOkLoading = false;
  title: string;
  isDisable: boolean;
  ckeckedRoleMenuList: any = [];
  roleMenuList1: any = [];

  constructor(
    private msg: NzMessageService,
    private roleService: RoleService,
    private menuService: MenuService,
    private staffSercice: StaffSercice
  ) {}

  ngOnInit() {
    this.staffObj = this.staffSercice.getStaffObj();
    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    // if (this.name) {
    //   option.conditions.push({ key: 'name', value: this.name });
    // }

    this.roleService.getRoleList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });

    this.menuService.getAllMenu().subscribe(data => {
      // this.dataSet = data.msg;
      this.allMenuList = data.msg;
    });
  }

  generateTree2(data, parentId, canCheck) {
    const itemArr: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      if (node.parentId === parentId) {
        let newNode: NzTreeNodeOptions;
        newNode = {
          key: node.id,
          title: node.name,
          disabled: canCheck
        };
        let children = this.generateTree2(data, node.id, canCheck);
        if (children != null) {
          newNode.children = children;
        } else {
          newNode.isLeaf = true;
        }
        itemArr.push(newNode);
      }
    }
    return itemArr.length > 0 ? itemArr : null;
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

  show(item, flag) {
    this.isVisible = true;
    if (flag) {
      this.title = '编辑角色信息';
      this.isDisable = false;
      this.menuTreeNodes = this.generateTree2(this.allMenuList, '0', false);
    } else {
      this.isDisable = true;
      this.title = '查看角色信息';
      this.menuTreeNodes = this.generateTree2(this.allMenuList, '0', true);
    }
    this.currentRole = item;
    this.roleService.getRoleById(item.id).subscribe(data => {
      this.ckeckedRoleMenuList = [];
      const meluList: any = [];
      for (let i = 0; i < data.msg.roleMenuList.length; i++) {
        meluList.push(data.msg.roleMenuList[i].id);
      }
      this.ckeckedRoleMenuList = meluList;
    });
  }

  add() {
    this.isVisible = true;
    this.isDisable = false;
    this.title = '添加角色';
    this.currentRole = {};
  }

  delete(item) {
    this.roleService.deleteRoleByIds([item.id]).subscribe(res => {
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
    if (this.isDisable) {
      this.isVisible = false;
      return;
    }
    if (!this.FormValidation()) {
      return;
    }
    // this.roleMenuList = menuTree.getCheckedNodeList();
    this.isOkLoading = true;
    let list = [];
    for (let i = 0; i < this.roleMenuList1.length; i++) {
      let id = this.roleMenuList1[i].key;
      list.push(this.allMenuList.find(myObj => myObj.id === id));
    }
    this.currentRole.roleMenuList = list;
    this.roleService.saveOrUpdateRole(this.currentRole).subscribe(res => {
      this.isOkLoading = false;
      this.isVisible = false;
      this.currentRole = {};
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

  updateRoleMenuList($event) {
    this.roleMenuList1 = [];
    $event.checkedKeys.forEach(element => {
      let list = this.convertTreeToList(element);
      this.roleMenuList1 = this.roleMenuList1.concat(list);
    });
  }

  convertTreeToList(root) {
    var stack = [],
      array = [],
      hashMap = {};
    stack.push(root);

    while (stack.length !== 0) {
      var node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (var i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }

    return array;
  }
  visitNode(node, hashMap, array) {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
}

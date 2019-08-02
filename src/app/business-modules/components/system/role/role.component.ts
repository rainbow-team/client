import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { RoleService } from 'src/app/services/system/role.service';
import { MenuService } from 'src/app/services/system/menu.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd';

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
      this.menuTreeNodes = this.generateTree2(data.msg, '0');
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
      this.currentRole = item;
      this.roleService.getRoleById(item.id).subscribe(data => {
        for (var i = 0; i < data.msg.roleMenuList.length; i++) {
          this.currentRole.roleMenuList.push(data.msg.roleMenuList[i].id);
        }
      });
    } else {
      this.currentRole = {};
    }
  }

  delete(item) {
    this.roleService.deleteRoleByIds([item.id]).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else if (res.code == 500) {
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
    for (let i = 0; i < this.currentRole.roleMenuList.length; i++) {
      let id = this.currentRole.roleMenuList[i];
      this.currentRole.roleMenuList[i] = this.allMenuList.find(
        myObj => myObj.id === id
      );
    }
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
}

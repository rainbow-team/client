import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { OrgService } from 'src/app/services/system/org.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd';
import { TreeNodeInterface } from 'src/app/utilities/entities/navMenu';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  dictionary: any = {};
  staffObj: any = {};
  data: any = {};
  dataSet: any = [];
  menuTreeNodes: any = [];
  currentMenu: any = {};
  name: any = '';

  isVisible = false;
  isOkLoading = false;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private orgService: OrgService,
    private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice
  ) {}
  mapOfExpandedData: { [id: string]: TreeNodeInterface[] } = {};

  collapse(
    array: TreeNodeInterface[],
    data: TreeNodeInterface,
    $event: boolean
  ): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({
            ...node.children[i],
            level: node.level + 1,
            expand: false,
            parent: node
          });
        }
      }
    }

    return array;
  }

  visitNode(
    node: TreeNodeInterface,
    hashMap: { [key: string]: any },
    array: TreeNodeInterface[]
  ): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  generateTree(data, parentId) {
    const itemArr: any[] = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (node.parentId == parentId) {
        let newNode: TreeNodeInterface;
        newNode = {
          id: node.id,
          name: node.name,
          parentId: parentId,
          code: node.code,
          level: 0,
          expand: false,
          children: this.generateTree(data, node.id)
        };
        itemArr.push(newNode);
      }
    }
    return itemArr;
  }
  // getNodesWithoutLeaf(data) {
  //   const itemArr: any[] = [];
  //   for (var i = 0; i < data.length; i++) {
  //     var node = data[i];
  //     for (var j = 0; j < data.length; j++) {
  //       var node1 = data[j];
  //       if (node.id == node1.parentId) {
  //         itemArr.push(node);
  //         break;
  //       }
  //     }
  //   }
  //   return itemArr;
  // }
  generateTree2(data, parentId) {
    const itemArr: any[] = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (node.parentId == parentId) {
        let newNode: NzTreeNodeOptions;
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
  ngOnInit() {
    // this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.search();
  }

  search() {
    let option = {
      conditions: []
    };

    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }

    this.orgService.getAllOrganization().subscribe(data => {
      // this.dataSet = data.msg;
      this.dataSet = this.generateTree(data.msg, '0');
      this.menuTreeNodes = this.generateTree2(data.msg, '0');
      this.dataSet.forEach(item => {
        this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
      });
    });
  }

  show(item, flag) {
    this.isVisible = true;

    if (flag) {
      this.currentMenu = item;
    } else {
      this.currentMenu = {};
    }
  }

  delete(item) {
    this.orgService.deleteOrganizationByIds([item.id]).subscribe(res => {
      if (res.code === 200) {
        this.msg.create('success', '删除成功');
        this.search();
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
    this.orgService
      .saveOrUpdateOrganization(this.currentMenu)
      .subscribe(res => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.currentMenu = {};
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { MenuService } from 'src/app/services/system/menu.service';

export interface TreeNodeInterface {
  id: number;
  name: string;
  code: string;
  level: number;
  expand: boolean;
  children?: TreeNodeInterface[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class SystemMenuComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};
  data: any = {};
  dataSet: any = [];
  currentMenu: any = {};
  name: any = '';

  isVisible = false;
  isOkLoading = false;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private menuService: MenuService,
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
    hashMap: { [kidey: string]: any },
    array: TreeNodeInterface[]
  ): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  getJsonTree(data: any[], parentId: any): any[] {
    const itemArr: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      //data.splice(i, 1)
      if (node.parentId == parentId) {
        let newNode: TreeNodeInterface;
        let child = this.getJsonTree(data, node.id);
        if (child) {
          newNode = {
            id: node.id,
            name: node.name,
            code: node.code,
            level: 0,
            expand: false,
            children: child
          };
        } else {
          newNode = {
            id: node.id,
            name: node.name,
            code: node.code,
            level: 0,
            expand: false
          };
        }
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
    var option = {
      conditions: []
    };

    if (this.name) {
      option.conditions.push({ key: 'name', value: this.name });
    }

    this.menuService.getAllMenu().subscribe(data => {
      // this.dataSet = data.msg;
      this.dataSet = this.getJsonTree(data.msg, '0');
      this.dataSet.forEach(item => {
        this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
      });
    });
  }

  add() {
    // this.router.navigate(['/permit/equip/add']);
  }

  show(item) {
    this.isVisible = true;
    this.currentMenu = item;
  }

  delete(item) {
    this.menuService.deleteMenuByIds([item.id]).subscribe(res => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.search();
      } else {
        this.msg.create('error', '删除失败');
      }
    });
  }

  showModal(): void {}

  handleOk(): void {
    this.isOkLoading = true;
    this.menuService.saveOrUpdateMenu(this.data).subscribe(res => {
      this.isVisible = false;
      this.isOkLoading = false;
      if (res.code == 200) {
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
}

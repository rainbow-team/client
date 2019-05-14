import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzModalService
} from 'ng-zorro-antd';
import { LayoutChangeService } from 'src/app/layouts/services/layout-change.service';

@Component({
  selector: 'app-orgstaff-manage',
  templateUrl: './orgstaff-manage.component.html',
  styleUrls: ['./orgstaff-manage.component.scss']
})
export class OrgstaffManageComponent implements OnInit, OnDestroy {

  @ViewChild('orgTree') treeInstance: NzTreeComponent;
  dropdownContext: NzDropdownContextComponent;
  activedNode: NzTreeNode;

  fixedHeight = 410;
  nzTableScroll: any = { x: '1200px' };
  subWinResize: Subscription;

  searchValue;
  nodes;
  tabs = [
    {
      active: true,
      name: '机构管理'
    },
    {
      active: false,
      name: '人员管理'
    }
  ];

  radioValue1;
  radioValue2;
  listOfOption = [];
  singleValue = 'a10';
  multipleValue = ['a10', 'c12'];
  demoValue;
  orgDataForm: FormGroup;
  dataSet = [];

  constructor(private nzDropdownService: NzDropdownService,
    private modal: NzModalService,
    private layoutService: LayoutChangeService) { }

  ngOnInit() {
    this.nzTableScroll.y = this.layoutService.getScrollHeight(this.fixedHeight) + 'px';
    this.subWinResize = this.layoutService.subWinResize.asObservable()
      .subscribe(() => {
        this.nzTableScroll.y = this.layoutService.getScrollHeight(this.fixedHeight) + 'px';
      });
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
    this.orgDataForm = new FormGroup({});
    this.nodes = [{
      title: 'parent 1',
      key: '100',
      expanded: true,
      children: [{
        title: 'parent 1-0',
        key: '1001',
        expanded: true,
        children: [
          { title: 'leaf', key: '10010', isLeaf: true },
          { title: 'leaf', key: '10011', isLeaf: true },
          { title: 'leaf', key: '10012', isLeaf: true }
        ]
      }, {
        title: 'parent 1-1',
        key: '1002',
        children: [
          { title: 'leaf', key: '10020', isLeaf: true }
        ]
      }, {
        title: 'parent 1-2',
        key: '1003',
        children: [
          { title: 'leaf', key: '10030', isLeaf: true },
          { title: 'leaf', key: '10031', isLeaf: true }
        ]
      }]
    }];
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }

  searchTreeData($event) {

  }

  selectDropdown(flag) {
    this.dropdownContext.close();
  }

  activeNode($event: NzFormatEmitEvent): void {
    if (this.activedNode) {
      this.activedNode.isSelected = false;
      this.treeInstance.nzTreeService.setSelectedNodeList(this.activedNode);
    }
    $event.node.isSelected = true;
    this.activedNode = $event.node;
    this.treeInstance.nzTreeService.setSelectedNodeList(this.activedNode);
  }

  openContextMenu($event: NzFormatEmitEvent, template: TemplateRef<void>): void {
    if (this.dropdownContext) {
      this.dropdownContext.close();
    }
    this.activeNode($event);
    this.dropdownContext = this.nzDropdownService.create($event.event, template);
  }

  confirmDelete() {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定删除该组织机构？',
      nzOnOk: () => {

      }
    });
  }

  deleteStaff(data) {

  }

  ngOnDestroy() {
    if (this.subWinResize) {
      this.subWinResize.unsubscribe();
    }
  }
}

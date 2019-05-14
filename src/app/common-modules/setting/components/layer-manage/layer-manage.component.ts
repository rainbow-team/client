import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode
} from 'ng-zorro-antd';

@Component({
  selector: 'app-layer-manage',
  templateUrl: './layer-manage.component.html',
  styleUrls: ['./layer-manage.component.scss']
})
export class LayerManageComponent implements OnInit {

  @ViewChild('layerDataTree') treeInstance: NzTreeComponent;
  dropdownContext: NzDropdownContextComponent;
  activedNode: NzTreeNode;
  searchValue;
  nodes;

  constructor(private nzDropdownService: NzDropdownService) { }

  ngOnInit() {
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
}

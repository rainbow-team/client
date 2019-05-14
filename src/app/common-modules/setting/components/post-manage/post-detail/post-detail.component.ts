import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input()
  isVisible = false;

  @Input()
  postDetail;

  @Output()
  handleClose = new EventEmitter();

  modalTitle = '添加岗位';
  isBusy = false;

  nodes = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
      title: 'Child Node1',
      value: '0-0-0',
      key: '0-0-0',
      isLeaf: true
    }]
  }, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [{
      title: 'Child Node3',
      value: '0-1-0',
      key: '0-1-0',
      isLeaf: true
    }, {
      title: 'Child Node4',
      value: '0-1-1',
      key: '0-1-1',
      isLeaf: true
    }, {
      title: 'Child Node5',
      value: '0-1-2',
      key: '0-1-2',
      isLeaf: true
    }]
  }];

  constructor() { }

  ngOnInit() {
    if (this.postDetail) {
      this.modalTitle = '编辑岗位';
    }
  }

  submitData() {
    this.isBusy = true;
    setTimeout(() => {
      this.isBusy = false;
      this.handleClose.emit();
    }, 3000);
  }

  handleCancel() {
    this.handleClose.emit();
  }
}

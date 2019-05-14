import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private modal: NzModalService) { }

  ngOnInit() {
  }

  exitSystem() {
    this.modal.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定退出系统？</b>',
      nzOnOk: () => this.router.navigate(['/login'])
    });
  }
}

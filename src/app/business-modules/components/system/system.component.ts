import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  menuItems: any = [
    { name: "人员管理" }, { name: "角色管理" }, { name: "权限管理" }, { name: "参数设置" }, { name: "日志管理" }
  ]

  selectMenuName = "参数设置";
  constructor() { }

  ngOnInit() {
  }

  clickMenu(item) {
    this.selectMenuName = item.name;
  }

}

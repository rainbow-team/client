import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  menuItems: any = [
    { name: '人员管理', isShow: false, id: "system:user" },
    { name: '角色管理', isShow: false, id: "system:role" },
    { name: '菜单管理', isShow: false, id: "system:menu" },
    { name: '机构管理', isShow: false, id: "system:org" },
    { name: '日志管理', isShow: false, id: "system:log" },
    { name: '静态数据设置', isShow: false, id: "system:setting" },
  ];

  selectMenuName = '人员管理';
  permissionList: any;
  constructor() { }

  ngOnInit() {

    let pers = sessionStorage.getItem("permission");
    if (pers) {
      this.permissionList = JSON.parse(pers);

      let data = this.permissionList.filter(function (per) {
        return per.indexOf("system") > -1;
      });

      this.menuItems.forEach(element => {

        let items = data.filter(function (param) {
          return param.indexOf(element.id) > -1
        });

        element.isShow = items.length > 0 ? true : false;
      });


    }
  }

  clickMenu(item) {
    this.selectMenuName = item.name;
  }
}

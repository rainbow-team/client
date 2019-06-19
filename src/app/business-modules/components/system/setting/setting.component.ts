import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  dataSet: any = [
    { Name: "法律标准数据库", Url: "192.168.5.123", key: 1 },
    { Name: "放射性废物治理数据库", Url: "192.168.5.123", key: 2 }
  ];
  editCache = {};

  configList: any = [
    { Name: "事故事件性质", TableName: "config_accident_nature" },
    { Name: "事故事件类别", TableName: "config_accident_type" },
    { Name: "核活动类型", TableName: "config_activity_type" },
    { Name: "无损检验等级", TableName: "config_check_level" },
    { Name: "无损检验方法", TableName: "config_check_method" }
  ];

  dicItems: any = [
   
  ]

  selectConfigItem: any;

  constructor() { }

  ngOnInit() {
    this.updateEditCache();
    this.selectConfigItem = this.configList[0];
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    Object.assign(this.dataSet[index], this.editCache[key].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[key].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  clickConfigItem(item) {
    this.selectConfigItem = item;
  }

}

import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-data-migration',
  templateUrl: './data-migration.component.html',
  styleUrls: ['./data-migration.component.scss']
})
export class DataMigrationComponent implements OnInit {

  typeList: any = [
    { id: "1", name: "核设施审评" },
    { id: "2", name: "日常监督信息" },
    { id: "3", name: "监督检查信息" },
    { id: "4", name: "监督见证信息" },
    { id: "5", name: "核设施安全问题" }
  ]
  types: any = [];

  constructor(private msg: NzMessageService) { }

  ngOnInit() {
  }

  exportData() {

    if (this.types.length == 0) {
      this.msg.create("warning", "请选择需要导出的表单");
      return;
    }

    let str = this.types.join(",");
    window.open( AppConfig.serviceAddress+"/dataMigration/exportData?type="+str, "_blank");

  }

}

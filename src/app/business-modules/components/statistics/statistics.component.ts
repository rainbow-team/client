import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  menuItems: any = [
    { name: "核设施统计" }, { name: "铀尾矿(渣)库统计" }, { name: "核安全许可统计" }, { name: "核安全审评统计" }, { name: "核安全监督统计 " }
    , { name: '安全问题统计' }, { name: '事故事件统计' }
  ]
  dataSet: any = [
    { name: 1 }
  ]

  selectMenuName = "核设施统计";

  typeValue: any = "1";
  typeName: any = "";

  condition: any = [
    {
      type: "1", name: "建造年代", con: {
        tableName: 'unit_fac',
        propertyName: 'build_year',
        configTableName: 'config_fac_supervison_category'
      }
    }, {
      type: "2", name: "监管类别", con: {
        tableName: 'unit_fac',
        propertyName: 'supervision_category_id',
        configTableName: 'config_fac_supervison_category'
      }
    }, {
      type: "3", name: "设施类型", con: {
        tableName: 'unit_fac',
        propertyName: 'type_id',
        configTableName: 'config_fac_type'
      }
    }, {
      type: "4", name: "设施状态", con: {
        tableName: 'unit_fac',
        propertyName: 'status_id',
        configTableName: 'config_fac_status'
      }
    }, {
      type: "5", name: "所在区域", con: {
        tableName: 'unit_fac',
        propertyName: 'status_id',
        configTableName: 'config_fac_status'
      }
    }, {
      type: "6", name: "审评状态", con: {
        tableName: 'unit_fac',
        propertyName: 'review_status_id',
        configTableName: 'config_review_status'
      }
    }, {
      type: "7", name: "许可情况", con: {
        tableName: 'unit_fac',
        propertyName: 'fac_permit_situation_id',
        configTableName: 'config_fac_permit_situation'
      }
    }, {
      type: "8", name: "抗震设防", con: {
        tableName: 'unit_fac',
        propertyName: 'supervision_category_id',
        configTableName: 'config_fac_supervison_category'
      }
    }, {
      type: "9", name: "防洪要求", con: {
        tableName: 'unit_fac',
        propertyName: 'supervision_category_id',
        configTableName: 'config_fac_supervison_category'
      }
    }
  ];



  reportId:any="1";

  constructor() { }

  ngOnInit() {

  }

  click(param){
    this.reportId=param;
  }
}
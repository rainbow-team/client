import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-umineplace-report',
  templateUrl: './umineplace-report.component.html',
  styleUrls: ['./umineplace-report.component.scss']
})
export class UmineplaceReportComponent implements OnInit {


  typeValue: any = "1";

  result: any = "";


  condition: any = [
    {
      type: "1", 
      name: "建造年代", 
      con: {
        tableName: 'unit_umine_place',
        propertyName: 'build_year',
        configTableName: 'config_fac_supervison_category',
        reportName: ''
      }
    }, {
      type: "2", 
      name: "铀尾矿(渣)库等别", 
      con: {
        tableName: 'unit_umine_place',
        propertyName: 'level_id',
        configTableName: 'config_umine_place_level',
        reportName: ''
      }
    }, {
      type: "3", name: "设施状态", con: {
        tableName: 'unit_umine_place',
        propertyName: 'status_id',
        configTableName: 'config_umine_place_status',
        reportName: ''
      }
    }, {
      type: "4", name: "审评状态", con: {
        tableName: 'unit_umine_place',
        propertyName: 'review_status_id',
        configTableName: 'config_review_status',
        reportName: ''
      }
    }, {
      type: "5", name: "许可情况", con: {
        tableName: 'unit_umine_place',
        propertyName: 'permit_situation_id',
        configTableName: 'config_umine_place_permit_situation',
        reportName: ''
      }
    }
  ];

  myChart3: any;

  data: any = [];

  title: any = "";
  des: any = "";
  chartTitle: any = "";

  constructor(private statisticsSercice: StatisticsSercice) { }

  ngOnInit() {

    setTimeout(() => {
      this.initEchart();
    }, 100);
    this.statistics();
  }

  filterCondition() {

    var that = this;
    this.result = this.condition.filter(function (p) {

      return p.type == that.typeValue;

    });

    that.chartTitle = "铀尾矿(渣)库统计(" + this.result[0].name + ")";
  }

  initEchart() {
    var that = this;
    let option3 = {
      title: {
        text: that.chartTitle ,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        bottom: 10,
        left: 'center'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: that.result[0].name,
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: that.data
         
        }
      ],
      color:['#339900', '#FF9900','#33CC99','#339966','#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    };

    this.myChart3 = echarts.init(document.getElementById("chart3qq"));
    this.myChart3.setOption(option3);
  }

  statistics() {

    this.filterCondition();
    if (this.typeValue == 1) {
      this.statisticsSercice.getStatisticsResultByYear(this.result[0].con).subscribe(
        (res) => {
          this.data = res.msg;
          this.initEchart();
        }
      );
    } else {
      this.statisticsSercice.getStatisticsResultByCondition(this.result[0].con).subscribe(
        (res) => {
          this.data = res.msg;
          this.initEchart();

        }
      );
    }
    this.title = this.result[0].name;
  }

  exportTable() {
    $("#umineplaceTable").table2excel({
       filename: "铀尾矿(渣)库统计",
    });
  }

}

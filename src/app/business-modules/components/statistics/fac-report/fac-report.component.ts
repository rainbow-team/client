import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-fac-report',
  templateUrl: './fac-report.component.html',
  styleUrls: ['./fac-report.component.scss']
})
export class FacReportComponent implements OnInit {
  typeValue: any = '1';

  result: any = '';

  condition: any = [
    {
      type: '1',
      name: '建造年代',
      con: {
        tableName: 'unit_fac',
        propertyName: 'build_year',
        configTableName: 'config_fac_supervison_category',
        reportName: ''
      }
    },
    {
      type: '2',
      name: '监管类别',
      con: {
        tableName: 'unit_fac',
        propertyName: 'supervision_category_id',
        configTableName: 'config_fac_supervison_category',
        reportName: ''
      }
    },
    {
      type: '3',
      name: '设施类型',
      con: {
        tableName: 'unit_fac',
        propertyName: 'type_id',
        configTableName: 'config_fac_type',
        reportName: ''
      }
    },
    {
      type: '4',
      name: '设施状态',
      con: {
        tableName: 'unit_fac',
        propertyName: 'status_id',
        configTableName: 'config_fac_status',
        reportName: ''
      }
    },
    {
      type: '5',
      name: '所在区域',
      con: {
        tableName: 'unit_fac',
        propertyName: 'status_id',
        configTableName: 'config_fac_status',
        reportName: ''
      }
    },
    {
      type: '6',
      name: '审评状态',
      con: {
        tableName: 'unit_fac',
        propertyName: 'review_status_id',
        configTableName: 'config_review_status',
        reportName: ''
      }
    },
    {
      type: '7',
      name: '许可情况',
      con: {
        tableName: 'unit_fac',
        propertyName: 'fac_permit_situation_id',
        configTableName: 'config_fac_permit_situation',
        reportName: ''
      }
    },
    {
      type: '8',
      name: '抗震设防',
      con: {
        tableName: 'unit_fac',
        propertyName: 'is_earthquake',
        configTableName: '',
        reportName: 'fac_earthquake'
      }
    },
    {
      type: '9',
      name: '防洪要求',
      con: {
        tableName: 'unit_fac',
        propertyName: 'is_flood',
        configTableName: '',
        reportName: 'fac_flood'
      }
    }
  ];

  myChart3: any;

  data: any = [];

  title: any = '';
  des: any = '';
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

    that.chartTitle = "核设施统计(" + this.result[0].name + ")";
  }

  initEchart() {
    //var that= this;
    let option3 = {
      title: {
        text: this.chartTitle,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
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
          name: this.result[0].name,
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.data
        }
      ],
      color:['#339900', '#FF9900','#33CC99','#339966','#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    };

    this.myChart3 = echarts.init(document.getElementById('chart3qq'));
    this.myChart3.setOption(option3);
  }

  statistics() {
    this.filterCondition();
    if (this.typeValue == 1) {
      this.statisticsSercice
        .getStatisticsResultByYear(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;
          this.initEchart();
        });
    }
    if ('2,3,4,6,7'.indexOf(this.typeValue) > -1) {
      this.statisticsSercice
        .getStatisticsResultByCondition(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;
          this.initEchart();
        });
    }
    if ('8,9'.indexOf(this.typeValue) > -1) {
      this.statisticsSercice
        .getStatisticsResultByBoolean(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;
          this.initEchart();
        });
    }
    if ('5'.indexOf(this.typeValue) > -1) {
      this.statisticsSercice.statisticsFacilitiesByRegion().subscribe(res => {
        this.data = res.msg;
        this.initEchart();
      });
    }
    this.title = this.result[0].name;
  }
  typeChanged($event) {
    this.statistics();
  }

  exportTable() {
    $("#factable").table2excel({
      filename: "核设施统计",
    });
  }

}

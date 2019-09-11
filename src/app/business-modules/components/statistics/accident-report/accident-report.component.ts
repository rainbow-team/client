import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-accident-report',
  templateUrl: './accident-report.component.html',
  styleUrls: ['./accident-report.component.scss']
})
export class AccidentReportComponent implements OnInit {
  result: any = '';

  con = {
    tableName: 'security_accident',
    propertyName: 'occur_date',
    configTableName: '',
    dateProperty: 'occur_date'
  };

  startDate: any = '';

  endDate: any = '';

  myChart: any;

  data: any = [];

  title: any = '事故事件统计';

  constructor(private statisticsSercice: StatisticsSercice) {}

  ngOnInit() {
    setTimeout(() => {
      this.initEchart();
    }, 100);

    let today = new Date();
    this.startDate = new Date(today.setFullYear(today.getFullYear() - 5));
    this.endDate = new Date();
    this.statistics();
  }

  initEchart() {
    var that = this;

    let option = {
      title: {
        text: that.title,
        x: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: this.data.map(function(v) {
          return v.name;
        })
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.data,
          type: 'bar'
        }
      ]
    };
    this.myChart = echarts.init(document.getElementById('chart'));
    this.myChart.setOption(option);
  }

  statistics() {
    this.con['startDate'] = this.startDate;
    this.con['endDate'] = this.endDate;
    this.statisticsSercice.searchReportByDateAndSum(this.con).subscribe(res => {
      this.data = res.msg;

      this.initEchart();
    });
  }
}

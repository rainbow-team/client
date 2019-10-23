import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';
import { NzMessageService } from 'ng-zorro-antd';
declare var $: any;

@Component({
  selector: 'app-check-activity-report',
  templateUrl: './check-activity-report.component.html',
  styleUrls: ['./check-activity-report.component.scss']
})
export class CheckActivityReportComponent implements OnInit {
  result: any = '';

  con = {
    tableName: 'check_activity',
    propertyName: 'check_date',
    configTableName: '',
    dateProperty: 'check_date'
  };

  startDate: any = '';

  endDate: any = '';

  myChart: any;

  data: any = [];

  title: any = '核活动审评统计';

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
        text: '核活动审评统计',
        x: 'center',
        subtext:
          this.startDate.getFullYear() +
          '年' +
          '-' +
          this.endDate.getFullYear() +
          '年'
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
        name: '数量(个)',
        type: 'value'
      },
      series: [
        {
          data: this.data,
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          }
        }
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      color: [
        '#339900',
        '#FF9900',
        '#33CC99',
        '#339966',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
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

  exportTable() {
    $('#car').table2excel({
      filename: '核活动审评统计'
    });
  }
}

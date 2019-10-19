import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-monitor-check-report',
  templateUrl: './monitor-check-report.component.html',
  styleUrls: ['./monitor-check-report.component.scss']
})
export class MonitorCheckReportComponent implements OnInit {
  startDate: any = '';

  endDate: any = '';

  result: any = '';

  con = {
    tableName: 'monitor_check',
    propertyName: 'type_id',
    configTableName: 'config_monitor_check_type',
    startDate: '',
    endDate: '',
    dateProperty: 'start_date'
  };

  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  myChart2: any;

  data: any = [];

  title: any = '监督检查统计';

  configList: any = [];

  constructor(private statisticsSercice: StatisticsSercice) {}

  ngOnInit() {
    setTimeout(() => {
      this.initEchart1();
    }, 100);

    let today = new Date();
    this.startDate = new Date(today.setFullYear(today.getFullYear() - 5));
    this.endDate = new Date();
    this.statistics();
  }

  initEchart1() {
    var that = this;

    let option1 = {
      title: {
        text: '监督检查统计',
        x: 'center',
        subtext:
          this.startDate.getFullYear() +
          '年' +
          '-' +
          this.endDate.getFullYear() +
          '年'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        bottom: 0,
        left: 'center',
        data: this.configList
      },
      grid: {
        left: '3%',
        right: '4%',
        // bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.data.yearDate
      },
      yAxis: {
        name: '数量(个)',
        type: 'value'
      },
      series: this.data.numberList,
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
      //this.data.numberList
    };
    this.myChart1 = echarts.init(document.getElementById('chart'));
    this.myChart1.setOption(option1);
  }

  statistics() {
    this.con['startDate'] = this.startDate;
    this.con['endDate'] = this.endDate;
    this.statisticsSercice
      .searchResultByPermitDateConditon(this.con)
      .subscribe(res => {
        this.data = res.msg;

        this.configList = this.data.numberList.map(function(v) {
          return v.name;
        });

        this.initEchart1();
      });
  }

  exportTable() {
    $('#mcr').table2excel({
      filename: '监督检查统计'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-monitor-daily-report',
  templateUrl: './monitor-daily-report.component.html',
  styleUrls: ['./monitor-daily-report.component.scss']
})
export class MonitorDailyReportComponent implements OnInit {



  startDate: any = "";

  endDate: any = "";

  result: any = "";


  con = {
    tableName: 'monitor_daily',
    propertyName: 'file_type_id',
    configTableName: 'config_monitor_daily_file_type',
    startDate: "",
    endDate: "",
    dateProperty:'file_date'
  };

  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  myChart2: any;

  data: any = [];

  title: any = "日常监督统计";


  configList: any = [];

  constructor(private statisticsSercice: StatisticsSercice) { }

  ngOnInit() {

    setTimeout(() => {
      this.initEchart1();
    }, 100);

    this.startDate = new Date();
    this.endDate = new Date();
    this.statistics();
  }

  initEchart1() {
    var that = this;

    let option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: this.configList
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.data.yearDate

      },
      yAxis: {
        type: 'value'
      },
      series: this.data.numberList
      //this.data.numberList
    };
    this.myChart1 = echarts.init(document.getElementById("chart"));
    this.myChart1.setOption(option1);
  };


  statistics() {

    this.con["startDate"] = this.startDate;
    this.con["endDate"] = this.endDate;
      this.statisticsSercice.searchResultByPermitDateConditon(this.con).subscribe(
        (res) => {
          this.data = res.msg;

          this.configList = this.data.numberList.map(function (v) { return v.name });

          this.initEchart1();

        }
      );
  }

}

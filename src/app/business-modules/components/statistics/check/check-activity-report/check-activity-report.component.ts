import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-check-activity-report',
  templateUrl: './check-activity-report.component.html',
  styleUrls: ['./check-activity-report.component.scss']
})
export class CheckActivityReportComponent implements OnInit {


  result: any = "";


  con = {
    tableName: 'check_activity',
    propertyName: 'check_date',
    configTableName: '',
    dateProperty:'check_date'
  };

  startDate: any = "";

  endDate: any = "";

  myChart: any;

  data: any = [];

  title: any = "核活动审评统计";

  constructor(private statisticsSercice: StatisticsSercice) { }

  ngOnInit() {

    setTimeout(() => {
      this.initEchart();
    }, 100);
  }

  initEchart() {
    var that = this;

    let option = {
      title: {
        text: that.title,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        data: this.data.map(function (v) { return v.name })
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.data,
        type: 'bar'
      }]
    };
    this.myChart = echarts.init(document.getElementById("chart"));
    this.myChart.setOption(option);
  }

  statistics() {

    this.con["startDate"] = this.startDate;
    this.con["endDate"] = this.endDate;
    this.statisticsSercice.searchReportByDateAndSum(this.con).subscribe(
      (res) => {
        this.data = res.msg;

        this.initEchart();

      }
    );

  }
}
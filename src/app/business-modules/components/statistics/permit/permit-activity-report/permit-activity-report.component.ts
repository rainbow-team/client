import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-permit-activity-report',
  templateUrl: './permit-activity-report.component.html',
  styleUrls: ['./permit-activity-report.component.scss']
})
export class PermitActivityReportComponent implements OnInit {


  startDate: any = "";

  endDate: any = "";

  result: any = "";


  con = {
    tableName: 'permit_activity',
    propertyName: 'permit_date',
    configTableName: '',
    startDate: "",
    endDate: "",
    dateProperty:'permit_date'
  }


  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  myChart2: any;

  data: any = [];

  title: any = "核活动许可统计";

  constructor(private statisticsSercice: StatisticsSercice) { }

  ngOnInit() {

    setTimeout(() => {
      this.initEchart();
    }, 100);
  }


  initEchart() {
    var that = this;

    let option2 = {
      title: {
        text: this.title,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        //formatter: "{a} <br/>{b} : {c} ({d}%)"
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
    this.myChart2 = echarts.init(document.getElementById("chart"));
    this.myChart2.setOption(option2);
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


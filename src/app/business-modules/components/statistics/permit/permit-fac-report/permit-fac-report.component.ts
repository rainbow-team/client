import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-permit-fac-report',
  templateUrl: './permit-fac-report.component.html',
  styleUrls: ['./permit-fac-report.component.scss']
})
export class PermitFacReportComponent implements OnInit {
  typeValue: any = '1';

  startDate: any = '';

  endDate: any = '';

  result: any = '';

  condition: any = [
    {
      type: '1',
      name: '许可阶段',
      con: {
        tableName: 'permit_fac',
        propertyName: 'stage_id',
        configTableName: 'config_fac_permit_stage',
        startDate: '',
        endDate: '',
        dateProperty: 'permit_date'
      }
    },
    {
      type: '2',
      name: '许可阶段',
      con: {
        tableName: 'permit_fac',
        propertyName: 'stage_id',
        configTableName: 'config_fac_permit_stage',
        startDate: '',
        endDate: '',
        dateProperty: 'permit_date'
      }
    }
  ];

  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  myChart2: any;

  data: any = [];

  title: any = '';

  des: any = '';

  configList: any = [];

  constructor(private statisticsSercice: StatisticsSercice) {}

  ngOnInit() {
    setTimeout(() => {
      this.initEchart2();
    }, 100);
    let today = new Date();
    this.startDate = new Date(today.setFullYear(today.getFullYear() - 5));
    this.endDate = new Date();
    this.statistics();
  }

  filterCondition() {
    var that = this;
    this.result = this.condition.filter(function(p) {
      return p.type == that.typeValue;
    });
  }

  initEchart1() {
    var that = this;

    let option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
    this.myChart1 = echarts.init(document.getElementById('chart1'));
    this.myChart1.setOption(option1);
  }

  initEchart2() {
    var that = this;

    let option2 = {
      title: {
        text: that.result[0].name,
        x: 'center'
      },
      tooltip: {
        trigger: 'item'
        //formatter: "{a} <br/>{b} : {c} ({d}%)"
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
    this.myChart2 = echarts.init(document.getElementById('chart2'));
    this.myChart2.setOption(option2);
  }

  statistics() {
    this.filterCondition();
    this.result[0].con['startDate'] = this.startDate;
    this.result[0].con['endDate'] = this.endDate;
    if (this.typeValue == 1) {
      this.statisticsSercice
        .searchResultByPermitDateConditon(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;

          this.configList = this.data.numberList.map(function(v) {
            return v.name;
          });

          this.initEchart1();
        });
    } else {
      this.statisticsSercice
        .searchResultByPermitStageConditon(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;
          this.initEchart2();
        });
    }

    this.title = this.result[0].name;
  }

  exportTable() {
    $("#pfr").table2excel({
       filename: "核安全设备许可统计",
    });
  }
}

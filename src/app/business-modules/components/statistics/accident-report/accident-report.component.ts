import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-accident-report',
  templateUrl: './accident-report.component.html',
  styleUrls: ['./accident-report.component.scss']
})
export class AccidentReportComponent implements OnInit {

  ids: any;

  typeValue: any = '1';

  startDate: any = '';

  endDate: any = '';

  result: any = '';

  condition: any = [
    {
      type: '1',
      name: '事故事件类别',
      con: {
        tableName: 'security_accident',
        propertyName: 'type_id',
        configTableName: 'config_accident_type',
        startDate: '',
        endDate: '',
        dateProperty: 'occur_date',
        ids: [],
        idsProperty: ''
      }
    },
    {
      type: '2',
      name: '事故事件性质',
      con: {
        tableName: 'security_accident',
        propertyName: 'nature_id',
        configTableName: 'config_accident_nature',
        startDate: '',
        endDate: '',
        dateProperty: 'occur_date',
        ids: [],
        idsProperty: ''
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

    let today = new Date();
    this.startDate = new Date(today.setFullYear(today.getFullYear() - 5));
    this.endDate = new Date();

    setTimeout(() => {
      this.initEchart1();
    }, 100);


    this.statistics();
  }

  filterCondition() {
    var that = this;
    this.result = this.condition.filter(function (p) {
      return p.type == that.typeValue;
    });
  }

  initEchart1() {
    var that = this;

    let option1 = {
      title: {
        text: "事故事件统计(" + that.result[0].name + ")",
        x: 'center',
        subtext: this.startDate.getFullYear() + "年" + "-" + this.endDate.getFullYear() + "年"
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
        data: this.configList,
        textStyle: {
          fontSize: 14
        }
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
      color: ['#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
      //this.data.numberList
    };
    this.myChart1 = echarts.init(document.getElementById('chart1'));
    this.myChart1.setOption(option1);
  }

  initEchart2() {
    var that = this;

    let option2 = {

      title: {
        text: "事故事件统计(" + that.result[0].name + ")",
        x: 'center'
      },
      tooltip: {
        trigger: 'item'
        //formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        data: this.data.map(function (v) {
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
      color: ['#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    };
    this.myChart2 = echarts.init(document.getElementById('chart2'));
    this.myChart2.setOption(option2);
  }

  statistics() {
    this.filterCondition();
    this.result[0].con['startDate'] = this.startDate;
    this.result[0].con['endDate'] = this.endDate;
    this.result[0].con['ids'] = this.ids;

    if (this.typeValue == 1) {
      this.statisticsSercice
        .searchResultByDateConditon(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;

          this.configList = this.data.numberList.map(function (v) {
            return v.name;
          });

          this.data.numberList.forEach(element => {
            element.label = {
              normal: {
                show: true,
                position: 'insideTop',
                textStyle: {
                  color: 'black'
                },
                formatter: function (params) {
                  let num = params.value;
                  return num > 0 ? num : "";
                }
              },
  
            }
          });

          this.initEchart1();
        });
    } else {
      this.statisticsSercice
        .searchResultByTypeConditon(this.result[0].con)
        .subscribe(res => {
          this.data = res.msg;
          this.initEchart2();
        });
    }
  }

  exportTable() {
    $('#sup').table2excel({
      filename: '事故事件统计'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
declare var $: any;

@Component({
  selector: 'app-permit-activity-report',
  templateUrl: './permit-activity-report.component.html',
  styleUrls: ['./permit-activity-report.component.scss']
})
export class PermitActivityReportComponent implements OnInit {
  startDate: any = '';

  endDate: any = '';

  result: any = '';

  con = {
    tableName: 'permit_activity',
    propertyName: 'permit_date',
    configTableName: '',
    startDate: '',
    endDate: '',
    dateProperty: 'permit_date'
  };

  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  myChart2: any;

  data: any = [];

  title: any = '核活动许可统计';

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

    let option2 = {
      title: {
        text: this.title,
        x: 'center',
        subtext:this.startDate.getFullYear() +"年"+ "-" +this.endDate.getFullYear()+"年"
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
        name: '数量(个)',
        type: 'value'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
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
      color:['#339900', '#FF9900','#33CC99','#339966','#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    };
    this.myChart2 = echarts.init(document.getElementById('chart'));
    this.myChart2.setOption(option2);
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
    $("#par").table2excel({
       filename: "核活动许可统计",
    });
  }
}

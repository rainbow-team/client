import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-accident-report',
  templateUrl: './accident-report.component.html',
  styleUrls: ['./accident-report.component.scss']
})
export class AccidentReportComponent implements OnInit {

  constructor(private statisticsSercice: StatisticsSercice) { }

  myChart: any;

  data:any=[];

  ngOnInit() {
    setTimeout(() => {
      this.initEchart();
    }, 100);
  }

  initEchart() {
    var that= this;
    let option = {
      title: {
        text: '事件事故统计',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'bottom',
        data: ['新设施', '旧设施']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'left',
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: '事故事件统计',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: that.data
          // data: [
          //   { value: 47, name: '新设施' },
          //   { value: 74, name: '旧设施' },
          // ]
        }
      ],
      color: ['rgb(254,67,101)', 'rgb(252,157,154)', 'rgb(249,205,173)', 'rgb(200,200,169)', 'rgb(131,175,155)']
    };

    this.myChart = echarts.init(document.getElementById("chart"));
    this.myChart.setOption(option);
  }

  statistics() {

      this.statisticsSercice.searchAccidentReport().subscribe(
        (res) => {
          this.data = res.msg;
          this.initEchart();
        }
      );
    }
}

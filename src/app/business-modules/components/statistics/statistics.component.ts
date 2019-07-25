import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  menuItems: any = [
    { name: "核设施统计" }, { name: "铀尾矿(渣)库统计" }, { name: "核安全许可统计" }, { name: "核安全审评统计" }, { name: "核安全监督统计 " }
    , { name: '安全问题统计' }, { name: '事故事件统计' }
  ]
  myChart3: any;
  dataSet: any = [
    { name: 1 }
  ]

  selectMenuName = "核设施统计";
  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      this.initEchart();
    }, 100);

  }

  initEchart() {
    let option3 = {
      title: {
        text: '核设施统计',
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
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 47, name: '新设施' },
            { value: 74, name: '旧设施' },
          ]
        }
      ]
    };

    this.myChart3 = echarts.init(document.getElementById("chart3qq"));
    this.myChart3.setOption(option3);
  }

  clickMenu(item) {
    this.selectMenuName = item.name;
  }

}

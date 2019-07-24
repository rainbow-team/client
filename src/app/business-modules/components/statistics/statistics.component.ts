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

      tooltip: { //提示框组件
        trigger: 'item', //触发类型(饼状图片就是用这个)
        formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器
      },
      color: ['#fac10d', '#fc422e', '#49b8ec', '#55b1a9'],  //手动设置每个图例的颜色
      legend: {  //图例组件
        //right:100,  //图例组件离右边的距离
        orient: 'horizontal',  //布局  纵向布局 图例标记居文字的左边 vertical则反之
        width: 40,      //图行例组件的宽度,默认自适应
        x: 'right',   //图例显示在右边
        y: 'center',   //图例在垂直方向上面显示居中
        itemWidth: 10,  //图例标记的图形宽度
        itemHeight: 10, //图例标记的图形高度
        data: ['类型一', '类型二', '类型三', '类型四'],
        textStyle: {    //图例文字的样式
          color: '#333',  //文字颜色
          fontSize: 12    //文字大小
        }
      },
      series: [ //系列列表
        {
          name: '',  //系列名称
          type: 'pie',   //类型 pie表示饼图
          center: ['40%', '50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
          radius: ['50%', '70%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
          itemStyle: {  //图形样式
            normal: { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              label: {  //饼图图形上的文本标签
                show: true, //平常不显示
                formatter: '{c}',
                position: 'inner'
              },
              labelLine: {     //标签的视觉引导线样式
                show: false  //平常不显示
              }
            },
            emphasis: {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              label: {  //饼图图形上的文本标签
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              }
            }
          },

          data: [
            { value: 12, name: '类型一' },
            { value: 24, name: '类型二' },
            { value: 23, name: '类型三' },
            { value: 45, name: '类型四' }
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

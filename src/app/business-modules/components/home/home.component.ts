import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
declare var MapConfig: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myChart1: any;
  myChart2: any;
  myChart3: any;
  myChart4: any;
  myChart5: any;

  conStatus = {
    tableName: 'unit_fac',
    propertyName: 'status_id',
    configTableName: 'config_fac_status',
    reportName: ''
  };

  conType = {
    tableName: 'unit_fac',
    propertyName: 'supervision_category_id',
    configTableName: 'config_fac_supervison_category',
    reportName: ''
  };
  conYear = {
    tableName: 'unit_fac',
    propertyName: 'build_year',
    configTableName: 'config_fac_supervison_category',
    reportName: ''
  };

  statusData: any = [];

  typeData: any = [];

  constructor(
    private statisticsSercice: StatisticsSercice,
    private router: Router
  ) {}

  ngOnInit() {
    this.initEchart();
    this.statisticsSercice
      .getStatisticsResultByCondition(this.conStatus)
      .subscribe(res => {
        this.statusData = res.msg;
        this.initEchart();
      });

    this.statisticsSercice
      .getStatisticsResultByCondition(this.conStatus)
      .subscribe(res => {
        this.typeData = res.msg;
        this.initEchart();
      });
  }

  initEchart() {
    let option1 = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['华北', '东北', '西北', '西南', '华东', '华南']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '数量',
          type: 'bar',
          data: [22, 16, 23, 35, 23, 24],
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          itemStyle: {
            //通常情况下：
            normal: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function(params) {
                var colorList = [
                  '#1779d1',
                  '#49b8ec',
                  '#55b1a9',
                  '#fc422e',
                  '#fac10d',
                  '#9f95eb'
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        }
      ]
    };

    let option2 = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: this.statusData.map(function(v) {
            return v.name;
          })
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '数量',
          type: 'bar',
          data: this.statusData,
          barWidth: 10,
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          itemStyle: {
            //通常情况下：
            normal: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function(params) {
                var colorList = ['#1779d1'];
                return colorList[params.dataIndex];
              }
            }
          }
        }
      ]
    };

    let option3 = {
      tooltip: {
        //提示框组件
        trigger: 'item', //触发类型(饼状图片就是用这个)
        formatter: '{a} <br/>{b} : {c} ({d}%)' //提示框浮层内容格式器
      },
      color: ['#fac10d', '#fc422e', '#49b8ec', '#55b1a9'], //手动设置每个图例的颜色
      legend: {
        //图例组件
        //right:100,  //图例组件离右边的距离
        orient: 'horizontal', //布局  纵向布局 图例标记居文字的左边 vertical则反之
        width: 40, //图行例组件的宽度,默认自适应
        x: 'right', //图例显示在右边
        y: 'center', //图例在垂直方向上面显示居中
        itemWidth: 10, //图例标记的图形宽度
        itemHeight: 10, //图例标记的图形高度
        data: ['类型一', '类型二', '类型三', '类型四'],
        textStyle: {
          //图例文字的样式
          color: '#333', //文字颜色
          fontSize: 12 //文字大小
        }
      },
      series: [
        //系列列表
        {
          name: '', //系列名称
          type: 'pie', //类型 pie表示饼图
          center: ['40%', '50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
          radius: ['50%', '70%'], //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
          itemStyle: {
            //图形样式
            normal: {
              //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              label: {
                //饼图图形上的文本标签
                show: true, //平常不显示
                formatter: '{c}',
                position: 'inner'
              },
              labelLine: {
                //标签的视觉引导线样式
                show: false //平常不显示
              }
            },
            emphasis: {
              //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              label: {
                //饼图图形上的文本标签
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              }
            }
          },

          data: this.typeData
        }
      ]
    };

    let option4 = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['生产设施', '科研设施', '废物管理']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2016', '2017', '2018']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '生产设施',
          type: 'line',
          data: [38, 26, 19]
        },
        {
          name: '科研设施',
          type: 'line',
          data: [39, 50, 28]
        },
        {
          name: '废物管理',
          type: 'line',
          data: [46, 39, 43]
        }
      ]
    };

    this.myChart1 = echarts.init(document.getElementById('chart1'));
    this.myChart1.setOption(option1);

    this.myChart2 = echarts.init(document.getElementById('chart2'));
    this.myChart2.setOption(option2);

    this.myChart3 = echarts.init(document.getElementById('chart3'));
    this.myChart3.setOption(option3);

    this.myChart4 = echarts.init(document.getElementById('chart4'));
    this.myChart4.setOption(option4);

    let mydata = [
      { name: '北京市', value: '100' },
      { name: '天津市', value: this.randomData() },
      { name: '上海市', value: this.randomData() },
      { name: '重庆市', value: this.randomData() },
      { name: '河北省', value: this.randomData() },
      { name: '河南省', value: this.randomData() },
      { name: '云南省', value: this.randomData() },
      { name: '辽宁省', value: this.randomData() },
      { name: '黑龙江省', value: this.randomData() },
      { name: '湖南省', value: this.randomData() },
      { name: '安徽省', value: this.randomData() },
      { name: '山东省', value: this.randomData() },
      { name: '新疆维吾尔自治区', value: this.randomData() },
      { name: '江苏省', value: this.randomData() },
      { name: '浙江省', value: this.randomData() },
      { name: '江西省', value: this.randomData() },
      { name: '湖北省', value: this.randomData() },
      { name: '广西省', value: this.randomData() },
      { name: '甘肃省', value: this.randomData() },
      { name: '山西省', value: this.randomData() },
      { name: '内蒙古自治区', value: this.randomData() },
      { name: '陕西省', value: this.randomData() },
      { name: '吉林省', value: this.randomData() },
      { name: '福建省', value: this.randomData() },
      { name: '贵州省', value: this.randomData() },
      { name: '广东省', value: this.randomData() },
      { name: '青海省', value: this.randomData() },
      { name: '西藏自治区', value: this.randomData() },
      { name: '四川省', value: this.randomData() },
      { name: '宁夏回族自治区', value: this.randomData() },
      { name: '海南省', value: this.randomData() },
      { name: '台湾省', value: this.randomData() },
      { name: '香港特别行政区', value: this.randomData() },
      { name: '澳门特别行政区', value: this.randomData() }
    ];

    var optionMap = {
      backgroundColor: '#FFFFFF',
      title: {
        text: '',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item'
      },

      //左侧小导航图标
      visualMap: {
        show: true,
        x: 'left',
        y: 'center',
        splitList: [
          { start: 500, end: 600 },
          { start: 400, end: 500 },
          { start: 300, end: 400 },
          { start: 200, end: 300 },
          { start: 100, end: 200 },
          { start: 0, end: 100 }
        ],
        color: [
          '#5475f5',
          '#9feaa5',
          '#85daef',
          '#74e2ca',
          '#e6ac53',
          '#9fb5ea'
        ]
      },

      //配置属性
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true //省份名称
            },
            emphasis: {
              show: false
            }
          },
          data: mydata //数据
        }
      ]
    };
    //初始化echarts实例
    this.myChart5 = echarts.init(document.getElementById('map'));
    echarts.registerMap('china', MapConfig.Configuration.chinaMap);

    //使用制定的配置项和数据显示图表
    this.myChart5.setOption(optionMap);

    this.myChart5.on('click', result => {
      this.router.navigate(['/searchShow/simulation'], {
        queryParams: { id: result.name }
      });
    });
  }

  randomData() {
    return Math.round(Math.random() * 500);
  }
}

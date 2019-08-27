import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import { UnitAddressService } from 'src/app/services/unit/unitaddress.service';
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
    private unitAddressService: UnitAddressService,
    private http: HttpClient,
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

    this.LoadChinaMap();
  }

  LoadChinaMap() {
    this.http.get('./assets/json/china.json').subscribe(mapData => {
      let chianMap = echarts.init(document.getElementById('map'));
      echarts.registerMap('china', mapData);
      this.unitAddressService.getChinaMapData().subscribe(result => {
        let mydata = result.msg;
        let mapOption = {
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
              { start: 25, end: 50 },
              { start: 15, end: 25 },
              { start: 8, end: 15 },
              { start: 4, end: 8 },
              { start: 2, end: 4 },
              { start: 0, end: 2 }
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
              zoom: 1.2,
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
        chianMap.setOption(mapOption);
      });

      chianMap.on('click', result => {
        this.router.navigate(['/searchShow/simulation'], {
          queryParams: { id: result.name }
        });
      });
    });
  }

  randomData() {
    return Math.round(Math.random() * 500);
  }
}

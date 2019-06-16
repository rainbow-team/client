import { Component, OnInit } from '@angular/core';

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

    constructor() { }

    ngOnInit() {
        this.initEchart();
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

                },

            ]
        };

        this.myChart1 = echarts.init(document.getElementById("chart1"));
        this.myChart1.setOption(option1);
    }







}

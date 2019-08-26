import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-security-equip-problem-report',
  templateUrl: './security-equip-problem-report.component.html',
  styleUrls: ['./security-equip-problem-report.component.scss']
})
export class SecurityEquipProblemReportComponent implements OnInit {


  serviceDepartList: any = [];

  ids: any ;

  typeValue: any = "1";

  startDate: any = "";

  endDate: any = "";

  result: any = "";


  condition: any = [
    {
      type: "1", name: "问题类别", con: {
        tableName: 'security_equip',
        propertyName: 'question_type_id',
        configTableName: 'config_equip_security_question_type',
        startDate: "",
        endDate: "",
        dateProperty: 'find_date',
        ids: [],
        idsProperty:"service_id"
      }
    }, {
      type: "3", name: "整改状态及问题类别", con: {
        tableName: 'security_equip',
        propertyName: 'question_type_id',
        configTableName: 'config_equip_security_question_type',
        startDate: "",
        endDate: "",
        dateProperty: 'find_date',
        ids: [],
        idsProperty:"service_id"
      }
    }
  ];

  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  data: any = [];

  title: any = "";

  des: any = "";

  configList: any = [];

  constructor(private statisticsSercice: StatisticsSercice) { }

  ngOnInit() {
    setTimeout(() => {
      this.initEchart1();
    }, 100);

    this.startDate = new Date();
    this.endDate = new Date();
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
    this.myChart1 = echarts.init(document.getElementById("chart1"));
    this.myChart1.setOption(option1);
  };

  statistics() {

    this.filterCondition();
    this.result[0].con["startDate"] = this.startDate;
    this.result[0].con["endDate"] = this.endDate;
    this.result[0].con["ids"] = this.ids;
  

    if (this.typeValue == 1) {
      this.statisticsSercice.searchResultByDateConditon(this.result[0].con).subscribe(
        (res) => {
          this.data = res.msg;

          this.configList = this.data.numberList.map(function (v) { return v.name });

          this.initEchart1();

        }
      );
    }else{
      this.statisticsSercice.searchResultByStatusAndType(this.result[0].con).subscribe(
        (res) => {
          this.data = res.msg;

          this.configList = this.data.numberList.map(function (v) { return v.name });

          this.initEchart1();

        }
      );
    }

    this.title = this.result[0].name;
  }
}

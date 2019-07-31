import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-security-servicedepart-report',
  templateUrl: './security-servicedepart-report.component.html',
  styleUrls: ['./security-servicedepart-report.component.scss']
})
export class SecurityServicedepartReportComponent implements OnInit {


  serviceDepartList: any = [];

  ids: any ;

  typeValue: any = "1";

  startDate: any = "";

  endData: any = "";

  result: any = "";


  condition: any = [
    {
      type: "1", name: "问题类别", con: {
        tableName: 'security_fac',
        propertyName: 'question_type_id',
        configTableName: 'config_fac_security_question_type',
        startDate: "",
        endDate: "",
        dateProperty: 'find_date',
        ids: [],
        idsProperty:"service_id",
        isService:'true'
      }
    }, {
      type: "2", name: "问题性质", con: {
        tableName: 'security_fac',
        propertyName: 'question_nature_id',
        configTableName: 'config_fac_security_question_nature',
        startDate: "",
        endDate: "",
        dateProperty: 'find_date',
        ids: [],
        idsProperty:"service_id",
        isService:'true'
      }
    },{
      type: "3", name: "整改状态及问题类别", con: {
        tableName: 'security_fac',
        propertyName: 'question_type_id',
        configTableName: 'config_fac_security_question_type',
        startDate: "",
        endDate: "",
        dateProperty: 'find_date',
        ids: [],
        idsProperty:"service_id",
        isService:'true'
      }
    }
  ];

  catagrayData: any = [];
  numberData: any = [];

  myChart1: any;

  myChart2: any;

  data: any = [];

  title: any = "";

  des: any = "";

  configList: any = [];

  constructor(private statisticsSercice: StatisticsSercice,
    private serviceDepartService: ServiceDepartService, ) { }

  ngOnInit() {

    this.serviceDepartService.getAllDepartService().subscribe((res) => {

      this.serviceDepartList = res.msg;
    })


    setTimeout(() => {
      this.initEchart1();
    }, 100);
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

  initEchart2() {
    var that = this;

    let option2 = {
      title: {
        text: that.result[0].name,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        //formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        data: this.data.map(function (v) { return v.name })
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.data,
        type: 'bar'
      }]
    };
    this.myChart2 = echarts.init(document.getElementById("chart2"));
    this.myChart2.setOption(option2);
  }

  statistics() {

    this.filterCondition();
    this.result[0].con["startDate"] = this.startDate;
    this.result[0].con["endDate"] = this.endData;
    this.result[0].con["ids"] = this.ids;
    // if (this.ids == null) {
    //   this.result[0].con["ids"] = null;

    // }
    //  else {
    //    this.result[0].con["ids"] = this.ids;
      // if (this.typeValue == 1) {
      //   this.statisticsSercice.searchResultByPermitDateConditon(this.result[0].con).subscribe(
      //     (res) => {
      //       this.data = res.msg;

      //       this.configList = this.data.numberList.map(function (v) { return v.name });

      //       this.initEchart1();

      //     }
      //   );
      // } else {
      //   this.statisticsSercice.searchResultByPermitStageConditon(this.result[0].con).subscribe(
      //     (res) => {
      //       this.data = res.msg;
      //       this.initEchart2();
      //     }
      //   );
      // }
    //  }

    if (this.typeValue == 1) {
      this.statisticsSercice.searchResultByDateConditon(this.result[0].con).subscribe(
        (res) => {
          this.data = res.msg;

          this.configList = this.data.numberList.map(function (v) { return v.name });

          this.initEchart1();

        }
      );
    } else if(this.typeValue==2){

      this.statisticsSercice.searchResultByTypeConditon(this.result[0].con).subscribe(
        (res) => {
          this.data = res.msg;
          this.initEchart2();

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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { CheckMonitorSercice } from 'src/app/services/monitor/check.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {


  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  equipDepartIds: any = [];

  equipDepartList: any = [];

  serviceDepartIds: any = [];

  serviceDepartList: any = [];

  facIds: any = [];

  facList: any = [];


  constructor(private router: Router,
    private msg: NzMessageService, private checkMonitorSercice: CheckMonitorSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService, private umineService: UmineService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.search();

    this.serviceDepartService.getAllDepartService().subscribe((res) => {
      if (res.code == 200) {
        this.serviceDepartList = [];
        res.msg.forEach(element => {
          this.serviceDepartList.push({
            id: element.id,
            name: element.name
          });
        });
      }
    })


    // this.facSercice.getAllDepartService().subscribe((res) => {
    //   if (res.code == 200) {
    //     this.serviceDepartList = [];
    //     res.msg.forEach(element => {
    //       this.serviceDepartList.push({
    //         id: element.id,
    //         name: element.name
    //       });
    //     });
    //   }
    // })

  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.name) {
      option.conditions.push({ key: "name", value: this.name })
    }

    // if (this.groupIds.length > 0) {
    //   option.conditions.push({ key: "groupIds", value: this.groupIds })
    // }

    this.checkMonitorSercice.getCheckMonitorList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    //this.groupIds = [];
  }

  add() {
    this.router.navigate(['/monitor/check/add']);
  }

  show(item, flag) {
    this.router.navigate(['/monitor/check/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.checkMonitorSercice.deleteCheckMonitorById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}
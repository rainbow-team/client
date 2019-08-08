import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { WitnessMonitorSercice } from 'src/app/services/monitor/witness.service';

@Component({
  selector: 'app-witness',
  templateUrl: './witness.component.html',
  styleUrls: ['./witness.component.scss']
})
export class WitnessComponent implements OnInit {

  @Input() servicedepartId: any = "";
  @Input() umineId: any = "";

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  obj:any="";

  items:any="";

  witness_date:any=[];


  constructor(private router: Router,
    private msg: NzMessageService, private witnessMonitorSercice: WitnessMonitorSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService, private umineService: UmineService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    if (this.servicedepartId || this.umineId) {
      this.isSearchShow = true;
    }

    this.search();

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

    if (this.obj) {
      option.conditions.push({ key: "witness_obj", value: this.obj })
    }

    if (this.items) {
      option.conditions.push({ key: "witness_items", value: this.items })
    }

    if (this.witness_date && this.witness_date.length > 0) {
      if (this.witness_date[0]) {
        option.conditions.push({ key: "start_date", value: this.witness_date[0] })
      }

      if (this.witness_date[1]) {
        option.conditions.push({ key: "end_date", value: this.witness_date[1] })
      }
    }

    if (this.servicedepartId) {
      option.conditions.push({
        key: 'servicedepartId',
        value: this.servicedepartId
      });
    }

    if (this.umineId) {
      option.conditions.push({
        key: 'umineId',
        value: this.umineId
      });
    }

    this.witnessMonitorSercice.getWitnessMonitorList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.obj="";
    this.items="";
    this.witness_date=[];
  }

  add() {
    this.router.navigate(['/monitor/witness/add']);
  }

  show(item, flag) {
    this.router.navigate(['/monitor/witness/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.witnessMonitorSercice.deleteWitnessMonitorById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

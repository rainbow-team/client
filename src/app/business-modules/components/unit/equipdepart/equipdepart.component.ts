import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';

@Component({
  selector: 'app-equipdepart',
  templateUrl: './equipdepart.component.html',
  styleUrls: ['./equipdepart.component.scss']
})
export class EquipdepartComponent implements OnInit {

  @Input() isSearchShow = "0";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";
  product: any = "";

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private equipDepartService: EquipDepartService, private dictionaryService: DictionarySercice,
    private staffSercice: StaffSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionaryService.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

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

    if (this.product) {
      option.conditions.push({ key: "product", value: this.product })
    }


    this.equipDepartService.getEquipDepartList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  pageIndexChange(num) {
    this.pageIndex = num;
    this.search();
  }

  pageSizeChange(num) {
    this.pageSize = num;
    this.pageIndex = 1;
    this.search();
  }

  reset() {
    this.name = "";
    this.product = "";
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/unit/equipdepart/add']);
  }

  show(item) {

    if (this.isSearchShow == "0") {
      this.router.navigate(['/unit/equipdepart/add'], { queryParams: { id: item.id, isShow: true } });
    } else {
      this.router.navigate(['/searchShow/integratedAuery/equipdepartSearch'], { queryParams: { id: item.id } });
    }
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/unit/equipdepart/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }


  delete() {

    if (this.selectId) {

      this.equipDepartService.deleteEquipDepartById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msgg);
          this.search();
        } else if (res.code == 500) {
          this.msg.create("warning", res.msg);
        } else {
          this.msg.create("error", res.msg);
        }
      })

    } else {
      this.msg.create("warning", "请选择删除项");
    }
  }

  selectItem(data) {
    this.selectId = data.id;
  }
}

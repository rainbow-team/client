import { Component, OnInit } from '@angular/core';
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

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  product: any="";

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

  reset() {
    this.name = "";
    this.product = "";
  }

  add() {
    this.router.navigate(['/unit/equipdepart/add']);
  }

  show(item, flag) {
    this.router.navigate(['/unit/equipdepart/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.equipDepartService.deleteEquipDepartById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

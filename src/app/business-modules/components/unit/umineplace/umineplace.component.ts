import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UmineService } from 'src/app/services/unit/umine.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';

@Component({
  selector: 'app-umineplace',
  templateUrl: './umineplace.component.html',
  styleUrls: ['./umineplace.component.scss']
})
export class UmineplaceComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  umineIds: any = [];

  umineList: any = [];
  
  constructor(private router: Router,
    private msg: NzMessageService, private umineSercice: UmineService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,private uminePlaceSercice:UminePlaceService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.search();

    this.umineSercice.getAllUmine().subscribe((res) => {
      if (res.code == 200) {
          this.umineList = [];
          res.msg.forEach(element => {
              this.umineList.push({
                  id: element.id,
                  name: element.name
              });
          });
      }
  })
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

    if (this.umineIds.length > 0) {
      option.conditions.push({ key: "umineIds", value: this.umineIds })
    }

    this.uminePlaceSercice.getUminePlaceList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.umineIds = [];
  }

  add() {
    this.router.navigate(['/unit/umineplace/add']);
  }

  show(item, flag) {
    this.router.navigate(['/unit/umineplace/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.uminePlaceSercice.deleteUminePlaceById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }


}

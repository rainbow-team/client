import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';

@Component({
  selector: 'app-uminemountain',
  templateUrl: './uminemountain.component.html',
  styleUrls: ['./uminemountain.component.scss']
})
export class UminemountainComponent implements OnInit {

  @Input() isSearchShow = "0";
  
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";
  umineName: any = "";
  build_year: any = "";
  statusIds: any = [];
  is_record: any = "";
  is_accept: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private umineSercice: UmineService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private umineMountainService: UmineMountainService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
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

    if (this.umineName) {
      option.conditions.push({ key: "umineName", value: this.umineName })
    }

    if (this.build_year && this.build_year.length > 0) {
     
      if (this.build_year[0]) {
        option.conditions.push({ key: "start_date", value: this.build_year[0] })
      }

      if (this.build_year[1]) {
        option.conditions.push({ key: "end_date", value: this.build_year[1] })
      }
    }

    if (this.statusIds.length > 0) {
      option.conditions.push({ key: "statusIds", value: this.statusIds })
    }

    if (this.is_record) {
      option.conditions.push({ key: "is_record", value: this.is_record })
    }

    if (this.is_accept) {
      option.conditions.push({ key: "is_accept", value: this.is_accept })
    }

    this.umineMountainService.getUmineMountainList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.statusIds = [];
  }

  add() {
    this.router.navigate(['/unit/uminemountain/add']);
  }

  childmanage(item) {
    this.router.navigate(['/unit/uminemountain/childmanage'], { queryParams: { id: item.id } });
  }

  show(item, flag) {
    this.router.navigate(['/unit/uminemountain/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.umineMountainService.deleteUmineMountainById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else if (res.code == 500) {
        this.msg.create("warning", res.msg);
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

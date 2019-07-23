import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminemountainCheckSercice } from 'src/app/services/check/uminemountain.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';

@Component({
  selector: 'app-uminemountain',
  templateUrl: './uminemountain.component.html',
  styleUrls: ['./uminemountain.component.scss']
})
export class UminemountainComponent implements OnInit {


  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = "";

  umineMountainName: any = "";

  content: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private uminemountainCheckSercice: UminemountainCheckSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private umineService: UmineService,
    private umineMountainService: UmineMountainService) { }

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

    if (this.umineName) {
      option.conditions.push({ key: "umineName", value: this.umineName })
    }

    if (this.umineMountainName) {
      option.conditions.push({ key: "umineMountainName", value: this.umineMountainName })
    }

    if (this.content) {
      option.conditions.push({ key: "content", value: this.content })
    }

    this.uminemountainCheckSercice.getUminemountainList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.umineName = "";
    this.umineMountainName = "";
    this.content = "";
  }

  add() {
    this.router.navigate(['/check/uminemountain/add']);
  }

  show(item, flag) {
    this.router.navigate(['/check/uminemountain/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.uminemountainCheckSercice.deleteUminemountainById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UminemountainCheckSercice } from 'src/app/services/check/uminemountain.service';
import { UmineMountainService } from 'src/app/services/unit/uminemountain.service';

@Component({
  selector: 'app-check-uminemountain',
  templateUrl: './uminemountain.component.html',
  styleUrls: ['./uminemountain.component.scss']
})
export class CheckUminemountainComponent implements OnInit {

  @Input() uminemountainId: any = "";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  umineName: any = "";

  umineMountainName: any = "";

  content: any = "";

  selectId: any = "";

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

    if (this.uminemountainId) {
      option.conditions.push({ key: "uminemountainId", value: this.uminemountainId })
    }


    this.uminemountainCheckSercice.getUminemountainCheckList(option).subscribe(
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
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/check/uminemountain/add']);
  }

  show(item) {

    if (this.uminemountainId) {
      this.router.navigate(['/searchShow/integratedAuery/checkuminemountainAdd'], { queryParams: { id: item.id, isShow: true, uminemountainId: this.uminemountainId } });
    } else {
      this.router.navigate(['/check/uminemountain/add'], { queryParams: { id: item.id, isShow: true } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/check/uminemountain/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {
      this.uminemountainCheckSercice.deleteUminemountainCheckById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
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


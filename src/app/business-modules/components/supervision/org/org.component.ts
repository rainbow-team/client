import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";
  nature: any = [];
  leader: any = [];

  constructor(private router: Router,
    private msg: NzMessageService, private orgSercice: OrgSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice) { }

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
    if (this.nature && this.nature.length > 0) {
      option.conditions.push({ key: "nature", value: this.nature })
    }
    if (this.leader) {
      option.conditions.push({ key: "leader", value: this.leader })
    }

    this.orgSercice.getOrgList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;

        if (this.dataSet || this.dataSet.length > 0) {
          this.dataSet.forEach(element => {

            if (element.nature && element.nature.length > 0) {
              element.natureName = "";
              element.nature.forEach(n => {
                element.natureName += n.value;
              });
            }

          });
        }

        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.nature = [];
    this.leader = "";
  }

  add() {
    this.router.navigate(['/supersivion/org/add']);
  }

  show(item, flag) {
    this.router.navigate(['/supersivion/org/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.orgSercice.deleteOrgByIds([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

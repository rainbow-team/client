import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { GroupService } from 'src/app/services/unit/group.service';

@Component({
  selector: 'app-umine',
  templateUrl: './umine.component.html',
  styleUrls: ['./umine.component.scss']
})
export class UmineComponent implements OnInit {
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  groupIds: any = [];

  groupList: any = [];
  
  constructor(private router: Router,
    private msg: NzMessageService, private umineSercice: UmineService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,private groupService: GroupService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.search();

    this.groupService.getAllGroup().subscribe((res) => {
      if (res.code == 200) {
          this.groupList = [];
          res.msg.forEach(element => {
              this.groupList.push({
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

    if (this.groupIds.length > 0) {
      option.conditions.push({ key: "groupIds", value: this.groupIds })
    }

    this.umineSercice.getUmineList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.groupIds = [];
  }

  add() {
    this.router.navigate(['/unit/umine/add']);
  }

  show(item, flag) {
    this.router.navigate(['/unit/umine/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.umineSercice.deleteUmineById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

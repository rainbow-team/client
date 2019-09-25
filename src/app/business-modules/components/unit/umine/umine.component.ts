import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { GroupService } from 'src/app/services/unit/group.service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-umine',
  templateUrl: './umine.component.html',
  styleUrls: ['./umine.component.scss']
})
export class UmineComponent implements OnInit {

  @Input() isSearchShow = "0";

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  groupIds: any = [];

  groupList: any = [];

  selectId: any = "";
  canManage:any=false;

  constructor(private router: Router,
    private msg: NzMessageService, private umineSercice: UmineService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private groupService: GroupService,private utilitiesSercice:UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("umine:manage");
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
    this.groupIds = [];
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/unit/umine/add']);
  }

  show(item) {

    if (this.isSearchShow == "0") {
      this.router.navigate(['/unit/umine/add'], { queryParams: { id: item.id, isShow: true } });
    } else {
      this.router.navigate(['/searchShow/integratedAuery/umineSearch'], { queryParams: { id: item.id } });
    }

  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/unit/umine/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {
    if (this.selectId) {
      this.umineSercice.deleteUmineById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
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

  exportUmine(){

    let url = AppConfig.serviceAddress + "/umine/exportUmine?name="+this.name; 

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { GroupService } from 'src/app/services/unit/group.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() isSearchShow = "0";
  
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  selectId: any = "";
  canManage: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private groupSercice: GroupService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice,private utilitiesSercice:UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("group:manage");

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

    this.groupSercice.getGroupList(option).subscribe(
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
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/unit/group/add']);
  }

  show(item) {

    if(this.isSearchShow=='0'){
      this.router.navigate(['/unit/group/add'], { queryParams: { id: item.id, isShow: true } });
    }else{
      this.router.navigate(['/searchShow/integratedAuery/groupAdd'], { queryParams: { id: item.id, isShow: true } });
    }
    
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/unit/group/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {
      this.groupSercice.deleteGroupById(this.selectId).subscribe((res) => {

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

  exportGroup(){
    let url = AppConfig.serviceAddress + "/group/exportGroup?name="+this.name; 

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");
  }
  
}

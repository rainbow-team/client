import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { GroupService } from 'src/app/services/unit/group.service';

@Component({
  selector: 'app-servicedepart',
  templateUrl: './servicedepart.component.html',
  styleUrls: ['./servicedepart.component.scss']
})
export class ServicedepartComponent implements OnInit {

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

  constructor(private router: Router,
    private msg: NzMessageService, private serviceDepartSercice: ServiceDepartService, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private groupService: GroupService) { }

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

    this.serviceDepartSercice.getServiceDepartList(option).subscribe(
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
    this.router.navigate(['/unit/servicedepart/add']);
  }

  goChildManage(item) {
    this.router.navigate(['/unit/servicedepart/childmanage'], { queryParams: { id: item.id } });
  }

  show(item, flag) {
    this.router.navigate(['/unit/servicedepart/add'], { queryParams: { id: item.id, flag: flag } });
  }

  SearchShow(item){
    this.router.navigate(['/unit/servicedepart/SearchShow'], { queryParams: { id: item.id } });
  }

  delete(item) {

    this.serviceDepartSercice.deleteServiceDepartById([item.id]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/system/user.service';
import { SystemLogService } from 'src/app/services/system/systemlog.service';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrls: ['./system-log.component.scss']
})
export class SystemLogComponent implements OnInit {


  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];
  userList: any = [];

  userId: any = "";
  starttime: any = "";
  endtime: any = "";

  constructor(private userService: UserService,private systemLogService:SystemLogService) { }

  ngOnInit() {

    this.userService.getAllUser().subscribe((res) => {

      this.userList = res.msg;
    });

    this.search();
  }

  search() {
    let option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    };

    if (this.userId) {
      option.conditions.push({ key: 'userId', value: this.userId });
    }
    if (this.starttime) {
      option.conditions.push({ key: 'starttime', value: this.starttime });
    }
    if (this.endtime) {
      option.conditions.push({ key: 'endtime', value: this.endtime });
    }

    this.systemLogService.getSystemLogList(option).subscribe(data => {
      this.dataSet = data.msg.currentList;
      this.totalCount = data.msg.recordCount;
    });


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
    this.userId = '';
    this.starttime = '';
    this.endtime = '';
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivityCheckSercice } from 'src/app/services/check/activity.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { EquipDepartService } from 'src/app/services/unit/equipdepart.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';

@Component({
  selector: 'app-check-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() servicedepartId: any = "";
  @Input() umineId: any = "";

  isSearchShow: any = false;

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  facName: any = "";

  typeIds: any = [];

  content: any = "";

  selectId: any = "";

  constructor(private router: Router,
    private msg: NzMessageService, private activityCheckSercice: ActivityCheckSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private equipDepartService: EquipDepartService,
    private serviceDepartService: ServiceDepartService, private facService: FacSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    if (this.servicedepartId || this.umineId) {
      this.isSearchShow = true;
    }

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

    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }

    if (this.typeIds.length > 0) {
      option.conditions.push({ key: "typeIds", value: this.typeIds })
    }

    if (this.content) {
      option.conditions.push({ key: "content", value: this.content })
    }

    if (this.servicedepartId) {
      option.conditions.push({
        key: 'servicedepartId',
        value: this.servicedepartId
      });
    }

    if (this.umineId) {
      option.conditions.push({
        key: 'umineId',
        value: this.umineId
      });
    }

    this.activityCheckSercice.getActivityList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.name = "";
    this.facName = "";
    this.typeIds = [];
    this.content = "";
    this.selectId = "";
  }

  add() {
    this.router.navigate(['/check/activity/add']);
  }

  show(item) {
    this.router.navigate(['/check/activity/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/check/activity/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }
  }

  delete() {

    if (this.selectId) {


      this.activityCheckSercice.deleteActivityById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", "删除成功");
          this.search();
        } else {
          this.msg.create("error", "删除失败");
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

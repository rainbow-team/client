import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from './../../../../../services/common/dictionary.service'
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SupervisionSercice } from 'src/app/services/supervision/supervision.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Jsonp } from '@angular/http/src/http';

@Component({
  selector: 'app-supervisor-childmanage',
  templateUrl: './supervisor-childmanage.component.html',
  styleUrls: ['./supervisor-childmanage.component.scss']
})
export class SupervisorChildmanageComponent implements OnInit {


  dataSet: any = [];
  MonitorList: any = [];
  data: any = {};
  supervisorId: any = "";

  //多选框控制
  ids: any = [];
  allChecked: any = false;
  indeterminate: any = false;

  dictionary: any = {};
  staffObj: any = {};

  isAssociateVisible: any = false;
  isVisible: any = false;
  batchAssociate: any = "";

  //保存控制
  isSaving = false;
  isDisable = false;
  modalTitle = "";
  okText = "";

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  pageIndexAssociate: any = 1;
  totalCountAssociate: any;
  pageSizeAssociate: any = 10;
  batchSearch: any = "";

  //选中的班次
  selectAssociateItem: any = {};
  batch: any = "";
  beginDate: any;
  endDate: any;

  constructor(private router: Router, private dictionarySercice: DictionarySercice, private staffSercice: StaffSercice,
    private ActivatedRoute: ActivatedRoute, private supervisionSercice: SupervisionSercice, private msg: NzMessageService) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    this.supervisorId = id;
    this.search();
  }


  search() {

    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    if (this.batchSearch) {
      option.conditions.push({ key: "batch", value: this.batchSearch })
    }
    option.conditions.push({ key: "supervisorId", value: this.supervisorId });

    this.supervisionSercice.getTrainRecordList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.dataSet = this.dataSet.map(r => { return Object.assign(r, { checked: false }) });
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  add() {
    this.data = {};
    this.modalTitle = "添加培训信息";
    this.okText = "提交";

    this.batch = "";
    this.beginDate = "";
    this.endDate = "";
    this.isVisible = true;
  }

  //查看与编辑
  show(param, flag) {

    this.data = param;
    this.batch = param.trainClass;
    this.beginDate = param.trainStartDate;
    this.endDate = param.trainEndDate;

    this.isDisable = flag;
    if (flag) {
      this.modalTitle = "查看培训信息";
      this.okText = null;
    } else {
      this.modalTitle = "编辑培训信息";
      this.okText = "提交";
    }

    this.isVisible = true;
  }


  delete() {

    let checkItems = this.dataSet.filter(value => value.checked);

    if (checkItems != null && checkItems.length == 0) {
      this.msg.create("warning", "请选择删除项");
      return;
    }

    checkItems.forEach(element => {
      this.ids.push(element.id);
    });

    this.supervisionSercice.deleteTrainRecordByIds(this.ids).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })
  }

  close() {
    this.router.navigate(['/supersivion/supervisor']);
  }

  //添加的保存
  SubmitTrainRecord() {

    this.isSaving = true;
    this.data.supervisorId = this.supervisorId;
    if (!this.data.id) {
      this.supervisionSercice.addTrainRecord(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.search();
          this.isVisible = false;
        } else {

          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
    } else {
      this.supervisionSercice.modifyTrainRecord(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.search();
          this.isVisible = false;
        } else {

          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
    }
  }

  //到期时间计算
  changeIssueDate(param) {

    if (param) {

      let year = param.getFullYear();
      let month = param.getMonth();
      let day = param.getDate();
      this.data.expireDate = new Date(year + 3, month, day);
    }

  }

  //关联信息
  Associate() {
    this.selectAssociateItem = {};
    this.isAssociateVisible = true;
    this.selectMonitorList();

  }

  selectMonitorList() {


    var option = {
      pageNo: this.pageIndexAssociate,
      pageSize: this.pageSizeAssociate,
      conditions: []
    }

    if (this.batchAssociate) {
      option.conditions.push({ key: "batch", value: this.batchAssociate })
    }

    this.supervisionSercice.getMonitorTrainList(option).subscribe(
      (data) => {
        this.MonitorList = data.msg.currentList;
        this.totalCountAssociate = data.msg.recordCount;
      }
    );
  }

  //选中培训班次
  clickAssociateItem(param) {
    this.selectAssociateItem = param;
  }

  ConfirmAssociate() {

    let param = this.selectAssociateItem;
    this.batch = param.batch;
    this.beginDate = param.beginDate;
    this.endDate = param.endDate;
    this.data.classId = this.selectAssociateItem.id;
    this.isAssociateVisible = false;

  }

}

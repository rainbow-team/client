import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SupervisionSercice } from 'src/app/services/supervision/supervision.service';

@Component({
  selector: 'app-monitor-train-add',
  templateUrl: './monitor-train-add.component.html',
  styleUrls: ['./monitor-train-add.component.scss']
})
export class MonitorTrainAddComponent implements OnInit {

  data: any = {};

  fileList = [
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ];
  previewImage = '';
  previewVisible = false;

  dictionary: any = {};
  staffObj: any = {};

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private supervisionSercice: SupervisionSercice, private ActivatedRoute: ActivatedRoute) { }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    if (id) {
      this.supervisionSercice.getTrainRecordById(id).subscribe((res) => {
        this.data = res.msg;
      })
    } else {
      this.data.createDate = new Date();
    }

  }

  save() {

    if (this.data.id) {

      this.data.modifyId = this.staffObj.id;
      this.supervisionSercice.modifyTrainRecord(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/index/supersivion/monitorTrain']);
        } else {
          this.msg.create('error', '保存失败');
        }
      });

    } else {

      this.data.creatorId = this.staffObj.id;
      this.data.modifyId = this.staffObj.id;
      this.supervisionSercice.addTrainRecord(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/index/supersivion/monitorTrain']);
        } else {
          this.msg.create('error', '保存失败');
        }
      });
    }

  }

  close() {
    this.router.navigate(['/index/supersivion/monitorTrain']);
  }
}

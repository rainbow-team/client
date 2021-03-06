import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SupervisionSercice } from 'src/app/services/supervision/supervisor.service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { HttpRequest, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { SupervisionTrainService } from 'src/app/services/supervision/supervisortrain.service';
import { AttachmentComponent } from 'src/app/layouts/components/attachment/attachment.component';

@Component({
  selector: 'app-monitor-train-add',
  templateUrl: './monitor-train-add.component.html',
  styleUrls: ['./monitor-train-add.component.scss']
})
export class MonitorTrainAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;
  
  @ViewChild(AttachmentComponent)
  child:AttachmentComponent

  data: any = {};
  isSaving = false;
  isShow = false;

  fileList = [];

  uploadUrl: any = AppConfig.serviceAddress + "/fileInfo/upload";
  previewImage = '';
  previewVisible = false;

  dictionary: any = {};
  staffObj: any = {};

  startValue: Date = null;
  endValue: Date = null;


  constructor(private msg: NzMessageService, private router: Router, private staffSercice: StaffSercice,
    private supervisionTrainService: SupervisionTrainService, private ActivatedRoute: ActivatedRoute,
    private http: HttpClient, private attachmentSercice: AttachmentSercice) { }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  ngOnInit() {
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let isShow = this.ActivatedRoute.snapshot.queryParams["isShow"];

    if (isShow && isShow == "true") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (id) {
      this.supervisionTrainService.getMonitorTrainById(id).subscribe((res) => {
        this.data = res.msg;

        this.startValue = new Date(this.data.beginDate);
        this.endValue = new Date(this.data.endDate);

        this.staffObj.name = this.data.creatorName;
      });

      this.attachmentSercice.getFileListById(id).subscribe((res1) => {

        if (res1.msg.length > 0) {
          res1.msg.forEach(element => {
           
            this.fileList.push({
              response: {
                msg: element.fileinfoId
              },
              name: element.fileinfoClientFileName
            });
          });
        }
      })
    } else {
      this.data.createDate = new Date();
    }

  }

  save() {

    if (!this.FormValidation()) {
      return;
    }

    this.isSaving = true;
    this.data.attachmentList = [];

    var fileList = this.child.fileList;
    if (fileList.length > 0) {

      if (!fileList[fileList.length-1].response) {

        this.msg.create('warning', '附件还未上传完毕,请稍等');
        this.isSaving = false;
        return;
      }
      fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    if (this.data.id) {

      this.data.modifyId = this.staffObj.id;
      this.supervisionTrainService.modifyMonitorTrain(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');

          this.router.navigate(['/supersivion/monitorTrain']);
        } else {

          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });



    } else {

      this.data.creatorId = this.staffObj.id;
      this.data.modifyId = this.staffObj.id;
      this.supervisionTrainService.addMonitorTrain(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');
          this.router.navigate(['/supersivion/monitorTrain']);
        } else {
          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });
    }

  }

  close() {
    this.router.navigate(['/supersivion/monitorTrain']);
  }

  customReq = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('filename', item.file.name);
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          // tslint:disable-next-line:no-any
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {

        // this.fileList.push({
        //   uid: event.body.msg,
        //   name: item.file.name
        // });
        // 处理成功
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  RemoveAttachment(id) {

    this.attachmentSercice.deleteFileById(id).subscribe(
      (data) => {
        if (data.code == 200) {

          for (let i = 0; i <= this.fileList.length; i++) {
            if (this.fileList[i].uid == id) {
              this.fileList.splice(i, 1);
              break;
            }
          }

        }
      }
    );

  }

  //表单手动触发验证
  FormValidation() {
    let isValid = true;
    this.directives.forEach(d => {
      if (!d.validationValue()) {
        isValid = false;
      }
    });
    return isValid;
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }
}

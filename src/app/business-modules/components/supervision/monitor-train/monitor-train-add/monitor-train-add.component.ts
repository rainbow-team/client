import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SupervisionSercice } from 'src/app/services/supervision/supervisor.service';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { HttpRequest, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';

@Component({
  selector: 'app-monitor-train-add',
  templateUrl: './monitor-train-add.component.html',
  styleUrls: ['./monitor-train-add.component.scss']
})
export class MonitorTrainAddComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  data: any = {};
  isSaving = false;
  isDisable = false;

  fileList = [
  ];

  uploadUrl: any = AppConfig.serviceAddress + "/fileInfo/upload";
  previewImage = '';
  previewVisible = false;

  dictionary: any = {};
  staffObj: any = {};

  constructor(private msg: NzMessageService, private router: Router, private dictionarySercice: DictionarySercice
    , private staffSercice: StaffSercice, private supervisionSercice: SupervisionSercice, private ActivatedRoute: ActivatedRoute,
    private http: HttpClient, private attachmentSercice: AttachmentSercice) { }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  ngOnInit() {
    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    var id = this.ActivatedRoute.snapshot.queryParams["id"];
    let flag = this.ActivatedRoute.snapshot.queryParams["flag"];

    if (flag && flag == "true") {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }

    if (id) {
      this.supervisionSercice.getMonitorTrainById(id).subscribe((res) => {
        this.data = res.msg;
        this.staffObj.name = this.data.creatorName;
      });

      this.attachmentSercice.getFileListById(id).subscribe((res1) => {

        if (res1.msg.length > 0) {
          res1.msg.forEach(element => {
            this.fileList.push({
              uid: element.fileinfoId,
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

    if (this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.data.attachmentList.push({ fileinfoId: element.response.msg });
      });
    }

    if (this.data.id) {

      this.data.modifyId = this.staffObj.id;
      this.supervisionSercice.modifyMonitorTrain(this.data).subscribe((res) => {
        if (res.code == 200) {
          this.msg.create('success', '保存成功');

          this.router.navigate(['/index/supersivion/monitorTrain']);
        } else {

          this.msg.create('error', '保存失败');
        }

        this.isSaving = false;
      });



    } else {

      this.data.creatorId = this.staffObj.id;
      this.data.modifyId = this.staffObj.id;
      this.supervisionSercice.addMonitorTrain(this.data).subscribe((res) => {
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
}

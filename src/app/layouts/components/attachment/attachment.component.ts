import { Component, OnInit, Input } from '@angular/core';
import { AttachmentSercice } from 'src/app/services/common/attachment.service';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Input() fileList = [];
  @Input() refid = "";
  @Input() isDisable = false;

  uploadUrl: any = AppConfig.serviceAddress + "/fileInfo/upload";
  downLoadurl: any = AppConfig.serviceAddress + "/fileInfo/download";

  constructor(private attachmentSercice: AttachmentSercice, private http: HttpClient) { }

  ngOnInit() {
  }

  customReq = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('filename', item.file.name);
    formData.append('refid', this.refid);

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

        // 处理成功
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  RemoveAttachment(item) {

    this.attachmentSercice.deleteFileById(item.response.msg).subscribe(
      (data) => {
        if (data.code == 200) {

          for (let i = 0; i <= this.fileList.length; i++) {
            if (this.fileList[i].response.msg == item.response.msg) {
              this.fileList.splice(i, 1);
              break;
            }
          }

        }
      }
    );

  }

  downloadAccessory(item) {
    window.open(this.downLoadurl + "?id=" + item.response.msg);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import { HttpRequest, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-common-import',
  templateUrl: './common-import.component.html',
  styleUrls: ['./common-import.component.scss']
})
export class CommonImportComponent implements OnInit {

  @Input() uploadUrl="";
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  constructor(private msg: NzMessageService,private http: HttpClient) { }

  ngOnInit() {
  }

  customReq = (item: UploadXHRArgs) => {

    var that = this;
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

            // 处理成功
            item.onSuccess(event.body, item.file, event);
            if (event.body.code == 200) {
                that.msg.create("success", "导入成功");
                that.search.emit(true);
            } else {
                that.msg.error(event.body.msg, { nzDuration: 10000 });
            }

        }
    }, (err) => {
        // 处理失败
        item.onError(err, item.file);
        that.msg.create("error", "导入失败");
    });
}

}

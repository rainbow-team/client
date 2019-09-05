import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
  selector: 'app-data-migration',
  templateUrl: './data-migration.component.html',
  styleUrls: ['./data-migration.component.scss']
})
export class DataMigrationComponent implements OnInit {

  typeList: any = [
    { id: "1", name: "核设施审评" },
    { id: "2", name: "日常监督信息" },
    { id: "3", name: "监督检查信息" },
    { id: "4", name: "监督见证信息" },
    { id: "5", name: "核设施安全问题" }
  ]
  types: any = [];

  uploadUrl: any = AppConfig.serviceAddress + "/dataMigration/importData";

  constructor(private msg: NzMessageService,private http: HttpClient,private utilitiesSercice:UtilitiesSercice) { }

  ngOnInit() {
    this.uploadUrl=this.utilitiesSercice.wrapUrl(this.uploadUrl);
  }

  exportData() {

    if (this.types.length == 0) {
      this.msg.create("warning", "请选择需要导出的表单");
      return;
    }

    let str = this.types.join(",");

    let url =AppConfig.serviceAddress+"/dataMigration/exportData?type="+str;
    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url , "_blank");

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
        that.msg.create("success", "导入成功");
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
      that.msg.create("error", "导入失败");
    });
  }

}

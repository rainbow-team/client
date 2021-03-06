import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { SastindSercice } from 'src/app/services/supervision/sastind.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { HttpRequest, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';


@Component({
  selector: 'app-sastind',
  templateUrl: './sastind.component.html',
  styleUrls: ['./sastind.component.scss']
})
export class SastindComponent implements OnInit {

  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  name: any = "";

  selectId: any = "";
  uploadUrl: any = AppConfig.serviceAddress + "/sastind/import";
  canManage: any = false;

  constructor(private router: Router,
    private msg: NzMessageService, private sastindSercice: SastindSercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private http: HttpClient, private utilitiesSercice: UtilitiesSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.canManage = this.utilitiesSercice.checkPermission("sastind:manage");

    this.search();
  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
    }

    this.sastindSercice.getSastindList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  add() {
    this.router.navigate(['/supersivion/sastind/add']);
  }

  show(item) {
    this.router.navigate(['/supersivion/sastind/add'], { queryParams: { id: item.id, isShow: true } });
  }

  modify() {
    if (this.selectId) {
      this.router.navigate(['/supersivion/sastind/add'], { queryParams: { id: this.selectId, isShow: false } });
    } else {
      this.msg.create("warning", "请选择修改项");
    }

  }
  delete() {

    if (this.selectId) {
      this.sastindSercice.deleteSastindById(this.selectId).subscribe((res) => {

        if (res.code == 200) {
          this.msg.create("success", res.msg);
          this.search();
        } else {
          this.msg.create("error", res.msg);
        }
      })
    } else {
      this.msg.create("warning", "请选择删除项");
    }

  }

  exportSastind() {

    let url = AppConfig.serviceAddress + "/sastind/exportSastind" 

    url = this.utilitiesSercice.wrapUrl(url);
    window.open(url, "_blank");

  }


  selectItem(data) {
    this.selectId = data.id;
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
        that.search();
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemLogService {

  constructor(private http: HttpClient) { }

  // 系统登录
  getSystemLogList(param): any {
    return this.http.post('/SystemLog/getSystemLogList', param);
  }

  deleteSystemLog(): any {
    return this.http.post('/SystemLog/deleteSystemLog', null);
  }


}

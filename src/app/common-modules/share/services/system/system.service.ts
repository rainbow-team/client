import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  // 系统登录
  login(param) {
    return this.http.post(AppConfig.serviceAddress+'/login1',null);
  }
}

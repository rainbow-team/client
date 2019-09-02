import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  // 系统登录
  login(param): any {
    return this.http.post('/login', param);
  }

  loginout(): any {
    return this.http.post('/loginout', null);
  }
}

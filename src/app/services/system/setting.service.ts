import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  // 系统登录
  getAllLinkList(): any {
    return this.http.post('/link/getAllLinkList', null);
  }

  addLink(param):any{
    return this.http.post('/link/addLink', param);
  }

  modifyLink(param):any{
    return this.http.post('/link/modifyLink', param);
  }

  deleteLinkDetailById(param):any{
    return this.http.post('/link/deleteLinkDetailById', param);
  }
}

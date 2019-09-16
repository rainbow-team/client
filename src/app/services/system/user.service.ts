import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(): any {
    return this.http.post('/user/getAllUser', null);
  }
  getUserList(param): any {
    return this.http.post('/user/getUserList', param);
  }

  saveOrUpdateUser(param): any {
    let url = !param.id ? '/user/addUser' : '/user/modifyUser';
    return this.http.post(url, param);
  }

  //获取用户的角色详情
  getUserWithRoleByUserId(id): any {
    return this.http.get('/user/getUserWithRoleByUserId?id=' + id);
  }

  deleteUserByIds(ids): any {
    return this.http.post('/user/deleteUsersByIds', ids);
  }

  changePassword(currentUser: any): any {
    return this.http.post('/user/changePassword', currentUser);
  }
}

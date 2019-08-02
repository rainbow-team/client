import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoleList(param): any {
    return this.http.post('/role/getRoleList', param);
  }

  saveOrUpdateRole(param): any {
    let url = !param.id ? '/role/addRole' : '/role/modifyRole';
    return this.http.post(url, param);
  }

  getRoleById(id): any {
    return this.http.get('/role/getRoleById?id=' + id);
  }

  deleteRoleByIds(ids): any {
    return this.http.post('/role/deleteRoleByIds', ids);
  }
}

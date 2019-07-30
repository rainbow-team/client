import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getAllMenu(): any {
    return this.http.post('/menu/getAllMenu', null);
  }

  saveOrUpdateMenu(param): any {
    let url = !param.id ? '/menu/addMenu' : '/menu/modifyMenu';
    return this.http.post(url, param);
  }

  deleteMenuByIds(ids): any {
    return this.http.post('/menu/deleteMenuByIds', ids);
  }
}

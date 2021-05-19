/*
 * @Description:
 * @Version: 1.0
 * @Autor: dyy
 * @Date: 2021-05-15 20:36:56
 * @LastEditors: dyy
 * @LastEditTime: 2021-05-15 20:41:20
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PermitPublishScopeService {
  constructor(private http: HttpClient) {}

  getListByPermitId(id): any {
    return this.http.get('/permitpublishscope/getListByPermitId?id=' + id);
  }
}

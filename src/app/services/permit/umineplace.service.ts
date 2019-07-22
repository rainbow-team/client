import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UmineplaceService {
  constructor(private http: HttpClient) {}

  getUmineplaceList(param): any {
    return this.http.post('/umineplacepermit/getUmineplacePermitList', param);
  }

  saveOrUpdateUmineplace(param): any {
    let url = !param.id
      ? '/umineplacepermit/addUmineplacePermit'
      : '/umineplacepermit/modifyUmineplacePermit';
    return this.http.post(url, param);
  }

  getUmineplaceById(id): any {
    return this.http.get('/umineplacepermit/getUmineplacePermitById?id=' + id);
  }

  deleteUmineplaceByIds(ids): any {
    return this.http.post('/umineplacepermit/deleteUmineplacePermitByIds', ids);
  }
}

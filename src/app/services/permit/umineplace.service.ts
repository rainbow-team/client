import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UmineplacePermitService {
  constructor(private http: HttpClient) {}

  getUmineplacePermitList(param): any {
    return this.http.post('/umineplacepermit/getUminePlacePermitList', param);
  }

  saveOrUpdateUmineplacePermit(param): any {
    let url = !param.id? '/umineplacepermit/addUminePlacePermit': '/umineplacepermit/modifyUminePlacePermit';
    return this.http.post(url, param);
  }

  getUmineplacePermitById(id): any {
    return this.http.get('/umineplacepermit/getUminePlacePermitById?id=' + id);
  }

  deleteUmineplacePermitByIds(ids): any {
    return this.http.post('/umineplacepermit/deleteUminePlacePermitByIds', ids);
  }
}

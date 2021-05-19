import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PermitFacSercice {
  constructor(private http: HttpClient) {}

  getFacPermitList(param): any {
    return this.http.post('/facpermit/getFacPermitList', param);
  }

  saveOrUpdateFac(param): any {
    let url = !param.id ? '/facpermit/addFacPermit' : '/facpermit/modifyFacPermit';
    return this.http.post(url, param);
  }

  getFacPermitById(id): any {
    return this.http.get('/facpermit/getFacPermitById?id=' + id);
  }

  deleteFacPermitByIds(ids): any {
    return this.http.post('/facpermit/deleteFacPermitByIds', ids);
  }

  audit(param): any {
    return this.http.post('/facpermit/audit', param);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UmineMountainPermitService {
  constructor(private http: HttpClient) {}

  getUmineMountainPermitList(param): any {
    return this.http.post(
      '/uminemountainpermit/getUmineMountainPermitList',
      param
    );
  }

  saveOrUpdateUmineMountainPermit(param): any {
    let url = !param.id
      ? '/uminemountainpermit/addUmineMountainPermit'
      : '/uminemountainpermit/modifyUmineMountainPermit';
    return this.http.post(url, param);
  }

  getUmineMountainPermitById(id): any {
    return this.http.get(
      '/uminemountainpermit/getUmineMountainPermitById?id=' + id
    );
  }

  deleteUmineMountainPermitByIds(ids): any {
    return this.http.post(
      '/uminemountainpermit/deleteUmineMountainPermitByIds',
      ids
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UminemountainService {
  constructor(private http: HttpClient) {}

  getMountainList(param): any {
    return this.http.post(
      '/uminemountainpermit/getUmineMountainPermitList',
      param
    );
  }

  saveOrUpdateMountain(param): any {
    let url = !param.id
      ? '/uminemountainpermit/addUmineMountainPermit'
      : '/uminemountainpermit/modifyUmineMountainPermit';
    return this.http.post(url, param);
  }

  getMountainById(id): any {
    return this.http.get(
      '/uminemountainpermit/getUmineMountainPermitById?id=' + id
    );
  }

  deleteMountainByIds(ids): any {
    return this.http.post(
      '/uminemountainpermit/deleteUmineMountainPermitByIds',
      ids
    );
  }
}

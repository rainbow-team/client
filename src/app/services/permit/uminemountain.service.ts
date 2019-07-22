import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UminemountainService {
  constructor(private http: HttpClient) {}

  getMountainList(param): any {
    return this.http.post('/uminemountainpermit/getMountainPermitList', param);
  }

  saveOrUpdateMountain(param): any {
    let url = !param.id
      ? '/uminemountainpermit/addMountainPermit'
      : '/uminemountainpermit/modifyMountainPermit';
    return this.http.post(url, param);
  }

  getMountainById(id): any {
    return this.http.get('/uminemountainpermit/getMountainPermitById?id=' + id);
  }

  deleteMountainByIds(ids): any {
    return this.http.post(
      '/uminemountainpermit/deleteMountainPermitByIds',
      ids
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityPermitService {
  constructor(private http: HttpClient) {}

  getActivityPermitList(param): any {
    return this.http.post('/activitypermit/getActivityPermitList', param);
  }

  saveOrUpdateActivityPermit(param): any {
    let url = !param.id
      ? '/activitypermit/addActivityPermit'
      : '/activitypermit/modifyActivityPermit';
    return this.http.post(url, param);
  }

  getActivityPermitById(id): any {
    return this.http.get('/activitypermit/getActivityPermitById?id=' + id);
  }

  deleteActivityPermitByIds(ids): any {
    return this.http.post('/activitypermit/deleteActivityPermitByIds', ids);
  }
}

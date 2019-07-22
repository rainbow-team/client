import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivityList(param): any {
    return this.http.post('/activitypermit/getActivityPermitList', param);
  }

  saveOrUpdateActivity(param): any {
    let url = !param.id
      ? '/activitypermit/addActivityPermit'
      : '/activitypermit/modifyActivityPermit';
    return this.http.post(url, param);
  }

  getActivityById(id): any {
    return this.http.get('/activitypermit/getActivityPermitById?id=' + id);
  }

  deleteActivityByIds(ids): any {
    return this.http.post('/activitypermit/deleteActivityPermitByIds', ids);
  }
}

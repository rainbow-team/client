import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivityCheckSercice {

    constructor(private http: HttpClient) { }

    getActivityList(param): any {
        return this.http.post('/activitycheck/getActivityCheckList', param);
    }

    saveOrUpdateActivity(param): any {

        let url = !param.id ? "/activitycheck/addActivityCheck" : "/activitycheck/modifyActivityCheck";
        return this.http.post(url, param);
    }

    getActivityById(id): any {

        return this.http.get('/activitycheck/geActivityCheckById?id=' + id);

    }

    deleteActivityById(id): any {
        return this.http.post('/activitycheck/deleteActivityCheckById',id);
    }
}
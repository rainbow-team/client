import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivityCheckSercice {

    constructor(private http: HttpClient) { }

    getActivityCheckList(param): any {
        return this.http.post('/activitycheck/getActivityCheckList', param);
    }

    saveOrUpdateActivityCheck(param): any {

        let url = !param.id ? "/activitycheck/addActivityCheck" : "/activitycheck/modifyActivityCheck";
        return this.http.post(url, param);
    }

    getActivityCheckById(id): any {

        return this.http.post('/activitycheck/geActivityCheckById',id);

    }

    deleteActivityCheckById(id): any {
        return this.http.post('/activitycheck/deleteActivityCheckById', id);
    }

    //核安全审评附件

    saveOrUpdateActivityFileCheck(param): any {
        let url = !param.id ? "/activityfilecheck/addActivityFileCheck" : "/activityfilecheck/modifyActivityFileCheck";
        return this.http.post(url, param);
    }

    getActivityFileCheckList(param): any {
        return this.http.post('/activityfilecheck/getActivityFileCheckList', param);
    }

    getActivityFileCheckById(id): any {
        return this.http.post('/activityfilecheck/getActivityFileCheckById', id);
    }

    deleteActivityFileCheckByIds(param): any {
        return this.http.post('/activityfilecheck/deleteActivityFileCheckByIds', param);
    }
}
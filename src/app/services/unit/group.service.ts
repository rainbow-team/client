import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GroupSercice {

    constructor(private http: HttpClient) { }

    getGroupList(param): any {
        return this.http.post('/group/getGroupList', param);
    }

    saveOrUpdateGroup(param): any {

        let url = !param.id ? "/group/addGroup" : "/group/modifyGroup";
        return this.http.post(url, param);
    }

    getGroupById(id): any {

        return this.http.get('/group/getGroupById?id=' + id);

    }

    deleteGroupById(id): any {
        return this.http.post('/group/deleteGroupById',id);
    }

    getAllGroup(): any {
        return this.http.post('/group/getAllGroup',null);
    }
}
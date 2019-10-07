import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrgSercice {

    constructor(private http: HttpClient) { }

    getAllOrgList(): any {
        return this.http.post('/org/getAllOrgList', null);
    }

    getOrgAndSastindList(): any {
        return this.http.post('/org/getOrgAndSastindList', null);
    }

    getOrgList(param): any {
        return this.http.post('/org/getOrgList', param);
    }

    saveOrUpdateOrg(param): any {

        let url = param.id ? "/org/modifyOrg" : "/org/addOrg";
        return this.http.post(url, param);
    }

    getOrgById(id): any {

        return this.http.get('/org/getOrgById?id=' + id);

    }

    deleteOrgByIds(ids): any {
        return this.http.post('/org/deleteOrgByIds', ids);
    }
}
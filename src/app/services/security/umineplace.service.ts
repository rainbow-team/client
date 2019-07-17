import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UmineplaceSecuritySercice {

    constructor(private http: HttpClient) { }

    getUmineplaceSecurityList(param): any {
        return this.http.post('/umineplacesecurity/getUminePlaceSecurityList', param);
    }

    saveOrUpdateUmineplaceSecurity(param): any {

        let url = !param.id ? "/umineplacesecurity/addUminePlaceSecurity" : "/umineplacesecurity/modifyUminePlaceSecurity";
        return this.http.post(url, param);
    }

    getUmineplaceSecurityById(id): any {

        return this.http.get('/umineplacesecurity/geUminePlaceSecurityById?id=' + id);

    }

    deleteUmineplaceSecurityById(id): any {
        return this.http.post('/umineplacesecurity/deleteUminePlaceSecurityById',id);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccidentSecuritySercice {

    constructor(private http: HttpClient) { }

    getAccidentSecurityList(param): any {
        return this.http.post('/accidentsecurity/getAccidentSecurityList', param);
    }

    saveOrUpdateAccidentSecurity(param): any {

        let url = !param.id ? "/accidentsecurity/addAccidentSecurity" : "/accidentsecurity/modifyAccidentSecurity";
        return this.http.post(url, param);
    }

    getAccidentSecurityById(id): any {

        return this.http.get('/accidentsecurity/geAccidentSecurityById?id=' + id);

    }

    deleteAccidentSecurityById(id): any {
        return this.http.post('/accidentsecurity/deleteAccidentSecurityById',id);
    }
}
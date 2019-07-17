import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacSecuritySercice {

    constructor(private http: HttpClient) { }

    getFacSecurityList(param): any {
        return this.http.post('/facsecurity/getFacSecurityList', param);
    }

    saveOrUpdateFacSecurity(param): any {

        let url = !param.id ? "/facsecurity/addFacSecurity" : "/facsecurity/modifyFacSecurity";
        return this.http.post(url, param);
    }

    getFacSecurityById(id): any {

        return this.http.get('/facsecurity/geFacSecurityById?id=' + id);

    }

    deleteFacSecurityById(id): any {
        return this.http.post('/facsecurity/deleteFacSecurityById',id);
    }
}
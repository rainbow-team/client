import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacSercice {

    constructor(private http: HttpClient) { }

    getFacList(param): any {
        return this.http.post('/fac/getFacList', param);
    }

    saveOrUpdateFac(param): any {

        let url = !param.id ? "/fac/addFac" : "/fac/modifyFac";
        return this.http.post(url, param);
    }

    getFacById(id): any {

        return this.http.get('/fac/getFacById?id=' + id);

    }

    deleteFacById(id): any {
        return this.http.post('/fac/deleteFacById',id);
    }

    getFacListByServiceid(id): any {
        return this.http.post('/fac/getFacListByServiceid',id);
    }
}
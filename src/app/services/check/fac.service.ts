import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacCheckSercice {

    constructor(private http: HttpClient) { }

    getFacList(param): any {
        return this.http.post('/faccheck/getFacCheckList', param);
    }

    saveOrUpdateFac(param): any {

        let url = !param.id ? "/faccheck/addFacCheck" : "/faccheck/modifyFacCheck";
        return this.http.post(url, param);
    }

    getFacById(id): any {

        return this.http.get('/faccheck/geFacCheckById?id=' + id);

    }

    deleteFacById(id): any {
        return this.http.post('/faccheck/deleteFacCheckById',id);
    }
}
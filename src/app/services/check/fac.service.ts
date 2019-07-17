import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacCheckSercice {

    constructor(private http: HttpClient) { }

    getFacCheckList(param): any {
        return this.http.post('/faccheck/getFacCheckList', param);
    }

    saveOrUpdateFacCheck(param): any {

        let url = !param.id ? "/faccheck/addFacCheck" : "/faccheck/modifyFacCheck";
        return this.http.post(url, param);
    }

    getFacCheckById(id): any {

        return this.http.get('/faccheck/geFacCheckById?id=' + id);

    }

    deleteFacCheckById(id): any {
        return this.http.post('/faccheck/deleteFacCheckById',id);
    }
}
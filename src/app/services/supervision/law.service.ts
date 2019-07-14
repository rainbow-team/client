import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LawSercice {

    constructor(private http: HttpClient) { }

    getLawList(param): any {
        return this.http.post('/lawsupervision/getLawList', param);
    }

    saveOrUpdateLaw(param): any {

        let url = !param.id ? "/lawsupervision/addLaw" : "/lawsupervision/modifyLaw";
        return this.http.post(url, param);
    }

    getLawById(id): any {

        return this.http.get('/lawsupervision/getLawById?id=' + id);

    }

    deleteLawByIds(ids): any {
        return this.http.post('/lawsupervision/deleteLawByIds',ids);
    }
}
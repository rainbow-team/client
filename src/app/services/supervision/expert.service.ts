import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ExpertSercice {

    constructor(private http: HttpClient) { }

    getExpertList(param): any {
        return this.http.post('/supervisionexpert/getExpertList', param);
    }

    saveOrUpdateExpert(param): any {

        let url = !param.id ? "/supervisionexpert/addExpert" : "/supervisionexpert/modifyExpert";
        return this.http.post(url, param);
    }

    getExpertById(id): any {

        return this.http.get('/supervisionexpert/getExpertById?id=' + id);

    }

    deleteExpertByIds(ids): any {
        return this.http.post('/supervisionexpert/deleteExpertByIds', ids);
    }
}
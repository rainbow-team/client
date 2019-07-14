import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WelderSercice {

    constructor(private http: HttpClient) { }

    getWelderList(param): any {
        return this.http.post('/welder/getWelderList', param);
    }

    saveOrUpdateWelder(param): any {

        let url = !param.id ? "/welder/addWelder" : "/welder/modifyWelder";
        return this.http.post(url, param);
    }

    getWelderById(id): any {

        return this.http.get('/welder/getWelderById?id=' + id);

    }

    deleteWelderByIds(ids): any {
        return this.http.post('/welder/deleteWelderByIds',ids);
    }
}
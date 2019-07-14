import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SastindSercice {

    constructor(private http: HttpClient) { }

    getSastindList(param): any {
        return this.http.post('/sastind/getSastindList', param);
    }

    saveOrUpdateSastind(param): any {

        let url = !param.id ? "/sastind/addSastind" : "/sastind/modifySastind";
        return this.http.post(url, param);
    }

    getSastindById(id): any {

        return this.http.get('/sastind/getSastindById?id=' + id);

    }

    deleteSastindById(id): any {
        return this.http.post('/sastind/deleteSastindById',id);
    }
}
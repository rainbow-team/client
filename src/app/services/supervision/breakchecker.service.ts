import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BreakCheckerSercice {

    constructor(private http: HttpClient) { }

    getBreakCheckerList(param): any {
        return this.http.post('/breakchecker/getBreakCheckerList', param);
    }

    saveOrUpdateBreakChecker(param): any {

        let url = !param.id ? "/breakchecker/addBreakChecker" : "/breakchecker/modifyBreakChecker";
        return this.http.post(url, param);
    }

    getBreakCheckertById(id): any {

        return this.http.get('/breakchecker/getBreakCheckertById?id=' + id);

    }

    deleteBreakCheckerByIds(ids): any {
        return this.http.post('/breakchecker/deleteBreakCheckerByIds',ids);
    }
}
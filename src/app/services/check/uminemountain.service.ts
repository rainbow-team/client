import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UminemountainCheckSercice {

    constructor(private http: HttpClient) { }

    getUminemountainList(param): any {
        return this.http.post('/uminemountaincheck/getUmineMountainCheckList', param);
    }

    saveOrUpdateUminemountain(param): any {

        let url = !param.id ? "/uminemountaincheck/addUmineMountainCheck" : "/uminemountaincheck/modifyUmineMountainCheck";
        return this.http.post(url, param);
    }

    getUminemountainById(id): any {

        return this.http.get('/uminemountaincheck/geUmineMountainCheckById?id=' + id);

    }

    deleteUminemountainById(id): any {
        return this.http.post('/uminemountaincheck/deleteUmineMountainCheckById',id);
    }
}
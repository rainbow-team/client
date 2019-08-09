import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UminemountainCheckSercice {

    constructor(private http: HttpClient) { }

    getUminemountainCheckList(param): any {
        return this.http.post('/uminemountaincheck/getUmineMountainCheckList', param);
    }

    saveOrUpdateUminemountainCheck(param): any {

        let url = !param.id ? "/uminemountaincheck/addUmineMountainCheck" : "/uminemountaincheck/modifyUmineMountainCheck";
        return this.http.post(url, param);
    }

    getUminemountainCheckById(id): any {

        return this.http.get('/uminemountaincheck/geUmineMountainCheckById?id=' + id);

    }

    deleteUminemountainCheckById(id): any {
        return this.http.post('/uminemountaincheck/deleteUmineMountainCheckById',id);
    }

    
    //核安全审评附件

    saveOrUpdateUmineMountainFileCheck(param): any {
        let url = !param.id ? "/uminemountainfilecheck/addUmineMountainFileCheck" : "/uminemountainfilecheck/modifyUmineMountainFileCheck";
        return this.http.post(url, param);
    }

    getUmineMountainFileCheckList(param): any {
        return this.http.post('/uminemountainfilecheck/getUmineMountainFileCheckList', param);
    }

    getUmineMountainFileCheckById(id): any {
        return this.http.post('/uminemountainfilecheck/getUmineMountainFileCheckById', id);
    }

    deleteUmineMountainFileCheckByIds(param): any {
        return this.http.post('/uminemountainfilecheck/deleteUmineMountainFileCheckByIds', param);
    }
}
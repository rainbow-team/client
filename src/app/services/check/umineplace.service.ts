import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UmineplaceCheckSercice {

    constructor(private http: HttpClient) { }


    getUmineplaceList(param): any {
        return this.http.post('/umineplacecheck/getUminePlaceCheckList', param);
    }

    saveOrUpdateUmineplace(param): any {

        let url = !param.id ? "/umineplacecheck/addUminePlaceCheck" : "/umineplacecheck/modifyUminePlaceCheck";
        return this.http.post(url, param);
    }

    getUmineplaceById(id): any {

        return this.http.get('/umineplacecheck/geUminePlaceCheckById?id=' + id);

    }

    deleteUmineplaceById(id): any {
        return this.http.post('/umineplacecheck/deleteUminePlaceCheckById', id);
    }

    //核安全审评附件

    saveOrUpdateUminePlaceFileCheck(param): any {
        let url = !param.id ? "/umineplacefilecheck/addUminePlaceFileCheck" : "/umineplacefilecheck/modifyUminePlaceFileCheck";
        return this.http.post(url, param);
    }

    getUminePlaceFileCheckList(param): any {
        return this.http.post('/umineplacefilecheck/getUminePlaceFileCheckList', param);
    }

    getUminePlaceFileCheckById(id): any {
        return this.http.post('/umineplacefilecheck/getUminePlaceFileCheckById', id);
    }

    deleteUminePlaceFileCheckByIds(param): any {
        return this.http.post('/umineplacefilecheck/deleteUminePlaceFileCheckByIds', param);
    }
}
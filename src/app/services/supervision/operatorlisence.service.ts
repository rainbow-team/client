import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OperatorLisenceSercice {

    constructor(private http: HttpClient) { }

    getOperatorLisenceList(param): any {
        return this.http.post('/operatorlisence/getOperatorLisenceList', param);
    }

    saveOrUpdateOperatorlisence(param): any {

        let url = !param.id ? "/operatorlisence/addOperatorLisence" : "/operatorlisence/modifyOperatorLisence";
        return this.http.post(url, param);
    }

    getOperatorLisenceById(id): any {

        return this.http.get('/operatorlisence/getOperatorLisenceById?id=' + id);

    }

    deleteOperatorLisenceByIds(ids): any {
        return this.http.post('/operatorlisence/deleteOperatorLisenceByIds',ids);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UmineMountainService {

    constructor(private http: HttpClient) { }

    getUmineMountainList(param): any {
        return this.http.post('/uminemountain/getUmineMountainList', param);
    }

    saveOrUpdateUmineMountain(param): any {

        let url = !param.id ? "/uminemountain/addUmineMountain" : "/uminemountain/modifyUmineMountain";
        return this.http.post(url, param);
    }

    getUmineMountainById(id): any {

        return this.http.get('/uminemountain/getUmineMountainById?id=' + id);

    }

    deleteUmineMountainById(id): any {
        return this.http.post('/uminemountain/deleteUmineMountainById', id);
    }


    getUmineMountainImproveList(param): any {
        return this.http.post('/uminemontainimprove/getUmineMountainImproveList', param);
    }

    saveOrUpdateUmineMountainImprove(param): any {

        let url = !param.id ? "/uminemontainimprove/addUmineMountainImprove" : "/uminemontainimprove/modifyUmineMountainImprove";
        return this.http.post(url, param);
    }

    getUmineMountainImproveById(id): any {

        return this.http.get('/uminemontainimprove/getUmineMountainImproveById?id=' + id);

    }

    deleteUmineMountainImproveByIds(ids): any {
        return this.http.post('/uminemontainimprove/deleteUmineMountainImproveByIds', ids);
    }

}
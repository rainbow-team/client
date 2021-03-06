import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UminePlaceService {

    constructor(private http: HttpClient) { }

    getUminePlaceList(param): any {
        return this.http.post('/umineplace/getUmineplaceList', param);
    }

    saveOrUpdateUminePlace(param): any {

        let url = !param.id ? "/umineplace/addUmineplace" : "/umineplace/modifyUmineplace";
        return this.http.post(url, param);
    }

    getUminePlaceById(id): any {

        return this.http.get('/umineplace/getUmineplaceById?id=' + id);

    }

    deleteUminePlaceById(id): any {
        return this.http.post('/umineplace/deleteUmineplaceById', id);
    }

    getUmineplaceListByUmineId(umineId): any {
        return this.http.post('/umineplace/getUmineplaceListByUmineId', umineId);
    }

    getUminePlaceImproveList(param): any {
        return this.http.post('/umineplaceimprove/getUminePlaceImproveList', param);
    }

    deleteUminePlaceImproveByIds(param): any {
        return this.http.post('/umineplaceimprove/deleteUminePlaceImproveByIds', param);
    }

    saveOrUpdateUminePlaceImprove(param): any {
        let url = !param.id ? "/umineplaceimprove/addUminePlaceImprove" : "/umineplaceimprove/modifyUminePlaceImprove";
        return this.http.post(url, param);
    }
}
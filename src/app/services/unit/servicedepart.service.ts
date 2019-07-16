import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceDepartService {

    constructor(private http: HttpClient) { }

    getServiceDepartList(param): any {
        return this.http.post('/servicedepart/getServiceDepartList', param);
    }

    saveOrUpdateServiceDepart(param): any {

        let url = !param.id ? "/group/addServiceDepart" : "/group/modifyServiceDepart";
        return this.http.post(url, param);
    }

    getServiceDepartById(id): any {

        return this.http.get('/group/getServiceDepartById?id=' + id);

    }

    deleteServiceDepartById(ids): any {
        return this.http.post('/group/deleteServiceDepartById',ids);
    }

    getAllDepartService(): any {
        return this.http.post('/group/getAllServiceDepartList',null);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EquipDepartService {

    constructor(private http: HttpClient) { }

    getEquipDepartList(param): any {
        return this.http.post('/equipdepart/getEquipDepartList', param);
    }

    saveOrUpdateEquipDepart(param): any {

        let url = !param.id ? "/equipdepart/addEquipDepart" : "/equipdepart/modifyEquipDepart";
        return this.http.post(url, param);
    }

    getEquipDepartById(id): any {

        return this.http.get('/equipdepart/getEquipDepartById?id=' + id);

    }

    deleteEquipDepartById(id): any {
        return this.http.post('/equipdepart/deleteEquipDepartById',id);
    }

    getAllEquipDepart(): any {
        return this.http.post('/equipdepart/getAllEquipDepart',null);
    }
}
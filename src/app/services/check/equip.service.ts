import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EquipCheckService {

    constructor(private http: HttpClient) { }

    getEquipList(param): any {
        return this.http.post('/equipcheck/getEquipCheckList', param);
    }

    saveOrUpdateEquip(param): any {

        let url = !param.id ? "/equipcheck/addEquipCheck" : "/equipcheck/modifyEquipCheck";
        return this.http.post(url, param);
    }

    getEquipById(id): any {

        return this.http.get('/equipcheck/geEquipCheckById?id=' + id);

    }

    deleteEquipById(id): any {
        return this.http.post('/equipcheck/deleteEquipCheckById',id);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EquipSecuritySercice {

    constructor(private http: HttpClient) { }

    getEquipSecurityList(param): any {
        return this.http.post('/equipsecurity/getEquipSecurityList', param);
    }

    saveOrUpdateEquipSecurity(param): any {

        let url = !param.id ? "/equipsecurity/addEquipSecurity" : "/equipsecurity/modifyEquipSecurity";
        return this.http.post(url, param);
    }

    getEquipSecurityById(id): any {

        return this.http.get('/equipsecurity/geEquipSecurityById?id=' + id);

    }

    deleteEquipSecurityById(id): any {
        return this.http.post('/equipsecurity/deleteEquipSecurityById',id);
    }
}
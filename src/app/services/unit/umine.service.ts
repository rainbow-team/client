import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UmineService {

    constructor(private http: HttpClient) { }

    getUmineList(param): any {
        return this.http.post('/umine/getUmineList', param);
    }

    saveOrUpdateUmine(param): any {

        let url = !param.id ? "/umine/addUmine" : "/umine/modifyUmine";
        return this.http.post(url, param);
    }

    getUmineById(id): any {

        return this.http.get('/umine/getUmineById?id=' + id);

    }

    deleteUmineById(id): any {
        return this.http.post('/umine/deleteUmineById',id);
    }

    
    getAllUmine(): any {
        return this.http.post('/umine/getAllUmine',null);
    }
}
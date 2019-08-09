import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EquipCheckService {

    constructor(private http: HttpClient) { }

    getEquipCheckList(param): any {
        return this.http.post('/equipcheck/getEquipCheckList', param);
    }

    saveOrUpdateEquipCheck(param): any {

        let url = !param.id ? "/equipcheck/addEquipCheck" : "/equipcheck/modifyEquipCheck";
        return this.http.post(url, param);
    }

    getEquipCheckById(id): any {

        return this.http.get('/equipcheck/geEquipCheckById?id=' + id);

    }

    deleteEquipCheckById(id): any {
        return this.http.post('/equipcheck/deleteEquipCheckById',id);
    }

    //核安全审评附件
    
    saveOrUpdateEquipFileCheck(param): any {
        let url = !param.id ? "/eqiupfilecheck/addEquipFileCheck" : "/eqiupfilecheck/modifyEquipFileCheck";
        return this.http.post(url, param);
    }

    getEquipFileCheckList(param): any {
        return this.http.post('/eqiupfilecheck/getEquipFileCheckList', param);
    }

    getEquipFileCheckById(id): any {
        return this.http.post('/eqiupfilecheck/getEquipFileCheckById',id);
    }

    deleteEquipFileCheckByIds(param): any {
        return this.http.post('/eqiupfilecheck/deleteEquipFileCheckByIds',param);
    }
}
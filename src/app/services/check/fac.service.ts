import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacCheckSercice {

    constructor(private http: HttpClient) { }

    getFacCheckList(param): any {
        return this.http.post('/faccheck/getFacCheckList', param);
    }

    saveOrUpdateFacCheck(param): any {

        let url = !param.id ? "/faccheck/addFacCheck" : "/faccheck/modifyFacCheck";
        return this.http.post(url, param);
    }

    getFacCheckById(id): any {
        return this.http.post('/faccheck/geFacCheckById',id);
    }

    deleteFacCheckById(id): any {
        return this.http.post('/faccheck/deleteFacCheckById',id);
    }

    //核安全审评附件
    
    saveOrUpdateFacFileCheck(param): any {
        let url = !param.id ? "/facfilecheck/addFacFileCheck" : "/facfilecheck/modifyFacFileCheck";
        return this.http.post(url, param);
    }

    getFacFileCheckList(param): any {
        return this.http.post('/facfilecheck/getFacFileCheckList', param);
    }

    getFacFileCheckById(id): any {
        return this.http.post('/facfilecheck/getFacFileCheckById',id);
    }

    deleteFacFileCheckByIds(param): any {
        return this.http.post('/facfilecheck/deleteFacFileCheckByIds',param);
    }
}
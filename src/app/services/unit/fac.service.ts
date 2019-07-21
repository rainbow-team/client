import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacSercice {

    constructor(private http: HttpClient) { }

    getFacList(param): any {
        return this.http.post('/fac/getFacList', param);
    }

    saveOrUpdateFac(param): any {

        let url = !param.id ? "/fac/addFac" : "/fac/modifyFac";
        return this.http.post(url, param);
    }

    getFacById(id): any {

        return this.http.get('/fac/getFacById?id=' + id);

    }

    deleteFacById(id): any {
        return this.http.post('/fac/deleteFacById', id);
    }

    getFacListByServiceid(id): any {
        return this.http.post('/fac/getFacListByServiceid', id);
    }


    getFacImproveList(param): any {
        return this.http.post('/facimprove/getFacImproveList', param);
    }

    saveOrUpdateFacImprove(param): any {

        let url = !param.id ? "/facimprove/addFacImprove" : "/facimprove/modifyFacImprove";
        return this.http.post(url, param);
    }

    getFacImproveById(id): any {

        return this.http.get('/facimprove/getFacImproveById?id=' + id);

    }

    deleteFacImproveByIds(ids): any {
        return this.http.post('/facimprove/deleteFacImproveByIds', ids);
    }

    
    getFacReportList(param): any {
        return this.http.post('/facreport/getFacReportList', param);
    }

    saveOrUpdateFacReport(param): any {

        let url = !param.id ? "/facreport/addFacReport" : "/facreport/modifyFacReport";
        return this.http.post(url, param);
    }

    getFacReportById(id): any {

        return this.http.get('/facreport/getFacReportById?id=' + id);

    }

    deleteFacReportByIds(ids): any {
        return this.http.post('/facreport/deleteFacReportByIds', ids);
    }
}
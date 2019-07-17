import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportMonitorSercice {

    constructor(private http: HttpClient) { }

    getReportMonitorList(param): any {
        return this.http.post('/reportmonitor/getReportMonitorList', param);
    }

    saveOrUpdateReportMonitor(param): any {

        let url = !param.id ? "/reportmonitor/addReportMonitor" : "/reportmonitor/modifyReportMonitor";
        return this.http.post(url, param);
    }

    getReportMonitorById(id): any {

        return this.http.get('/reportmonitor/geReportMonitorById?id=' + id);

    }

    deleteReportMonitorById(id): any {
        return this.http.post('/reportmonitor/deleteReportMonitorById',id);
    }
}
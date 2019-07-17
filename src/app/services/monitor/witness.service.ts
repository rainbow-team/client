import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WitnessMonitorSercice {

    constructor(private http: HttpClient) { }

    getWitnessMonitorList(param): any {
        return this.http.post('/witnessmonitor/getWitnessMonitorList', param);
    }

    saveOrUpdateWitnessMonitor(param): any {

        let url = !param.id ? "/witnessmonitor/addWitnessMonitor" : "/witnessmonitor/modifyWitnessMonitor";
        return this.http.post(url, param);
    }

    getWitnessMonitorById(id): any {

        return this.http.get('/witnessmonitor/geWitnessMonitorById?id=' + id);

    }

    deleteWitnessMonitorById(id): any {
        return this.http.post('/witnessmonitor/deleteWitnessMonitorById',id);
    }
}
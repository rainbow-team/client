import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DailyMonitorSercice {

    constructor(private http: HttpClient) { }

    getDailyMonitorList(param): any {
        return this.http.post('/dailymonitor/getDailyMonitorList', param);
    }

    saveOrUpdateDailyMonitor(param): any {

        let url = !param.id ? "/dailymonitor/addDailyMonitor" : "/dailymonitor/modifyDailyMonitor";
        return this.http.post(url, param);
    }

    getDailyMonitorById(id): any {

        return this.http.get('/dailymonitor/geDailyMonitorById?id=' + id);

    }

    deleteDailyMonitorById(id): any {
        return this.http.post('/dailymonitor/deleteDailyMonitorById',id);
    }
}
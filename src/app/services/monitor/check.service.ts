import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CheckMonitorSercice {

    constructor(private http: HttpClient) { }

    getCheckMonitorList(param): any {
        return this.http.post('/checkmonitor/getCheckMonitorList', param);
    }

    saveOrUpdateCheckMonitor(param): any {

        let url = !param.id ? "/checkmonitor/addCheckMonitor" : "/checkmonitor/modifyCheckMonitor";
        return this.http.post(url, param);
    }

    getCheckMonitorById(id): any {

        return this.http.get('/checkmonitor/geCheckMonitorById?id=' + id);

    }

    deleteCheckMonitorById(id): any {
        return this.http.post('/checkmonitor/deleteCheckMonitorById',id);
    }


    //监督检查文件管理
    
    saveOrUpdateMonitorCheckFileCheck(param): any {
        let url = !param.id ? "/checkfilemonitor/addCheckFileMonitor" : "/checkfilemonitor/modifyCheckFileMonitor";
        return this.http.post(url, param);
    }

    getMonitorCheckFileList(param): any {
        return this.http.post('/checkfilemonitor/getCheckFileMonitorList', param);
    }

    getMonitorCheckFileById(id): any {
        return this.http.post('/checkfilemonitor/geCheckFileMonitorById',id);
    }

    deleteMonitorCheckFileByIds(param): any {
        return this.http.post('/checkfilemonitor/deleteCheckFileMonitorByIds',param);
    }

}
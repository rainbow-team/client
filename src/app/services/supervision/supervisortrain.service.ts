import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SupervisionTrainService {

    constructor(private http: HttpClient) { }
  

    //核安全监督员培训信息
    addMonitorTrain(param): any {
        return this.http.post('/supervisiontrain/addMonitorTrain', param)
    }

    modifyMonitorTrain(param): any {
        return this.http.post('/supervisiontrain/modifyMonitorTrain', param)
    }

    getMonitorTrainList(param): any {
        return this.http.post('/supervisiontrain/getMonitorTrainList', param);
    }

    getMonitorTrainById(id): any {
        return this.http.get('/supervisiontrain/getMonitorTrainById?id=' + id);
    }

    deleteMonitorTrainByIds(ids): any {
        return this.http.post('/supervisiontrain/deleteMonitorTrainByIds', ids);
    }
}

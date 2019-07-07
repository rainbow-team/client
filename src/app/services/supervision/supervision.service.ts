import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SupervisionSercice {




    constructor(private http: HttpClient) { }

    //核安全监督员
    getSupervisionSupervisorList(param): any {
        return this.http.post('/SupervisionSupervisor/getSupervisionSupervisorList', param);
    }

    saveOrUpdateSupervisionSupervisor(param): any {
        return this.http.post('/SupervisionSupervisor/saveOrUpdateSupervisionSupervisor', param);
    }

    deleteSupervisionSupervisorByIds(ids): any {
        return this.http.post('/SupervisionSupervisor/deleteSupervisionSupervisorByIds',ids);
    }

    getSupervisionSupervisorById(id): any {
        return this.http.get('/SupervisionSupervisor/getSupervisionSupervisorById?id=' + id);
    }

    //核安全监督员培训信息
    addTrainRecord(param): any {
        return this.http.post('/supervisiontrain/addTrainRecord', param)
    }

    modifyTrainRecord(param): any {
        return this.http.post('/supervisiontrain/modifyTrainRecord', param)
    }

    getTrainRecordList(param): any {
        return this.http.post('/supervisiontrain/getTrainRecordList', param);
    }

    getTrainRecordById(id): any {
        return this.http.get('/supervisiontrain/getTrainRecordById?id=' + id);
    }

    deleteTrainRecordByIds(ids): any {
        return this.http.post('/supervisiontrain/deleteTrainRecordByIds', ids);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SupervisionSercice {




    constructor(private http: HttpClient) { }

    //核安全监督员
    addSupervisor(param): any {
        return this.http.post('/Supervisor/Supervisor', param);
    }

    modifySupervisor(param): any {
        return this.http.post('/Supervisor/modifySupervisor', param);
    }

    saveOrUpdateSupervisionSupervisor(param): any {

        let url = !param.id ? "/Supervisor/addSupervisor" : "/Supervisor/modifySupervisor";
        return this.http.post(url, param);
    }

    deleteSupervisorById(id): any {
        return this.http.post('/Supervisor/deleteSupervisorById', id);
    }

    getSupervisorById(id): any {
        return this.http.get('/Supervisor/getSupervisorById?id=' + id);
    }

    getSupervisorList(param): any {
        return this.http.get('/Supervisor/getSupervisorList?id=', param);
    }

    //核安全监督员子项管理
    addTrainRecord(param): any {
        return this.http.post('/SupervisionTrainRecord/addTrainRecord', param);
    }

    modifyTrainRecord(param): any {
        return this.http.post('/SupervisionTrainRecord/modifyTrainRecord', param);
    }

    getTrainRecordList(param): any {
        return this.http.post('/SupervisionTrainRecord/getTrainRecordList', param);
    }

    deleteTrainRecordByIds(param): any {
        return this.http.post('/SupervisionTrainRecord/deleteTrainRecordByIds', param);
    }


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

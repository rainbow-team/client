import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProducetrainSercice {

    constructor(private http: HttpClient) { }

    getProduceTrainList(param): any {
        return this.http.post('/producetrain/getProduceTrainList', param);
    }

    saveOrUpdateProducetrain(param): any {

        let url = !param.id ? "/producetrain/addProduceTrainRecord" : "/producetrain/modifyProduceTrainRecord";
        return this.http.post(url, param);
    }

    getProduceTrainRecordById(id): any {

        return this.http.get('/producetrain/getProduceTrainRecordById?id=' + id);

    }

    deleteProduceTrainRecordByIds(ids): any {
        return this.http.post('/producetrain/deleteProduceTrainRecordByIds',ids);
    }
}
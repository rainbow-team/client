import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatisticsSercice {

    constructor(private http: HttpClient) { }

    getStatisticsResultByCondition(param): any {
        return this.http.post('/statistics/getStatisticsResultByCondition', param);
    }

    getStatisticsResultByYear(param): any {
        return this.http.post('/statistics/getStatisticsResultByYear', param);
    }

    getStatisticsResultByBoolean(param): any {
        return this.http.post('/statistics/getStatisticsResultByBoolean', param);
    }
}
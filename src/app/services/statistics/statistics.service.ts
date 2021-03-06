import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsSercice {
  constructor(private http: HttpClient) {}

  getStatisticsResultByTypeAndDate(param): any {
    return this.http.post('/statistics/getStatisticsResultByTypeAndDate', param);
  }

  getStatisticsResultByCondition(param): any {
    return this.http.post('/statistics/getStatisticsResultByCondition', param);
  }

  getStatisticsResultByYear(param): any {
    return this.http.post('/statistics/getStatisticsResultByYear', param);
  }

  getStatisticsResultByBoolean(param): any {
    return this.http.post('/statistics/getStatisticsResultByBoolean', param);
  }

  searchResultByPermitStageConditon(param): any {
    return this.http.post(
      '/statistics/searchResultByPermitStageConditon',
      param
    );
  }

  searchResultByPermitDateConditon(param): any {
    return this.http.post(
      '/statistics/searchResultByPermitDateConditon',
      param
    );
  }

  getHomeNumer(): any {
    return this.http.post('/statistics/getHomeNumer', null);
  }

  searchSumReportByDateGroup(param): any {
    return this.http.post('/statistics/searchSumReportByDateGroup', param);
  }

  searchReportByDateAndSum(param): any {
    return this.http.post('/statistics/searchReportByDateAndSum', param);
  }

  searchResultByTypeConditon(param): any {
    return this.http.post('/statistics/searchResultByTypeConditon', param);
  }

  searchResultByDateConditon(param): any {
    return this.http.post('/statistics/searchResultByDateConditon', param);
  }

  searchResultByStatusAndType(param): any {
    return this.http.post('/statistics/searchResultByStatusAndType', param);
  }

  statisticsFacilitiesByRegion(): any {
    return this.http.post('/statistics/statisticsFacilitiesByRegion', null);
  }
}

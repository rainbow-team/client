import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceDepartService {
  constructor(private http: HttpClient) {}

  getServiceDepartList(param): any {
    return this.http.post('/servicedepart/getServiceDepartList', param);
  }

  saveOrUpdateServiceDepart(param): any {
    let url = !param.id ? '/servicedepart/addServiceDepart' : '/servicedepart/modifyServiceDepart';
    return this.http.post(url, param);
  }

  getServiceDepartById(id): any {
    return this.http.get('/servicedepart/getServiceDepartById?id=' + id);
  }

  deleteServiceDepartById(ids): any {
    return this.http.post('/servicedepart/deleteServiceDepartById', ids);
  }

  getAllDepartService(): any {
    return this.http.post('/servicedepart/getAllServiceDepartList', null);
  }

  getServiceAnnualReportList(param): any {
    return this.http.post('/serviceannualreport/getServiceAnnualReportList', param);
  }

  saveOrUpdateServiceAnnualReport(param): any {
    let url = !param.reportId
      ? '/serviceannualreport/addServiceAnnualReport'
      : '/serviceannualreport/modifyServiceAnnualReport';
    return this.http.post(url, param);
  }

  deleteServiceAnnualReportByIds(ids): any {
    return this.http.post('/serviceannualreport/deleteServiceAnnualReportByIds', ids);
  }
}

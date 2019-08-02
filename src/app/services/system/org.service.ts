import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  constructor(private http: HttpClient) {}

  getOrganizationList(param): any {
    return this.http.post('/org/getOrganizationList', param);
  }

  saveOrUpdateOrganization(param): any {
    let url = !param.id ? '/org/addOrganization' : '/org/modifyOrganization';
    return this.http.post(url, param);
  }

  getOrganizationById(id): any {
    return this.http.get('/org/getOrganizationById?id=' + id);
  }

  deleteOrganizationByIds(ids): any {
    return this.http.post('/org/deleteOrganizationByIds', ids);
  }
  getAllOrganization(): any {
    return this.http.post('org/getAllOrganization', null);
  }
}

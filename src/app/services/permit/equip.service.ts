import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipPermitService {
  constructor(private http: HttpClient) {}

  getEquipPermitList(param): any {
    return this.http.post('/equippermit/getEquipPermitList', param);
  }

  saveOrUpdateEquipPermit(param): any {
    let url = !param.id
      ? '/equippermit/addEquipPermit'
      : '/equippermit/modifyEquipPermit';
    return this.http.post(url, param);
  }

  getEquipPermitById(id): any {
    return this.http.get('/equippermit/getEquipPermitById?id=' + id);
  }

  deleteEquipPermitByIds(ids): any {
    return this.http.post('/equippermit/deleteEquipPermitByIds', ids);
  }
}

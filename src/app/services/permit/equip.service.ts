import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipService {
  constructor(private http: HttpClient) {}

  getEquipList(param): any {
    return this.http.post('/equippermit/getEquipPermitList', param);
  }

  saveOrUpdateEquip(param): any {
    let url = !param.id
      ? '/equippermit/addEquipPermit'
      : '/equippermit/modifyEquipPermit';
    return this.http.post(url, param);
  }

  getEquipById(id): any {
    return this.http.get('/equippermit/getEquipPermitById?id=' + id);
  }

  deleteEquipByIds(ids): any {
    return this.http.post('/equippermit/deleteEquipPermitByIds', ids);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitAddressService {
  constructor(private http: HttpClient) {}

  getUnitAddressList(param): any {
    return this.http.post('/unitaddress/getUnitAddressList', param);
  }

  saveOrUpdateUnitAddress(param): any {
    let url = !param.id
      ? '/unitaddress/addUnitAddress'
      : '/unitaddress/modifyUnitAddress';
    return this.http.post(url, param);
  }

  deleteUnitAddressById(id): any {
    return this.http.post('/unitaddress/deleteUnitAddressById', id);
  }

  getAllUnitAddress(): any {
    return this.http.post('/unitaddress/getAllUnitAddress', null);
  }
  getUnitAddressListByProvince(province): any {
    return this.http.post(
      '/unitaddress/getUnitAddressListByProvince',
      province
    );
  }
  getChinaMapData(): any {
    return this.http.post('/unitaddress/getChinaMapData', null);
  }
}

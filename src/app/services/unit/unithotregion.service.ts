import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnithotregionService {
  getUnitHotRegionById(id: any): any {
    return this.http.post('/unithotregion/getUnitHotRegionById', id);
  }
  constructor(private http: HttpClient) {}

  insertRegionsBatch(param): any {
    return this.http.post('/unithotregion/insertRegionsBatch', param);
  }

  getUnitHotRegionList(parma): any {
    return this.http.post('/unithotregion/getUnitHotRegionList', parma);
  }

  getUnitHotRegionListByAddressId(unitId): any {
    return this.http.post(
      '/unithotregion/getUnitHotRegionListByAddressId',
      unitId
    );
  }
  saveOrUpdateUnitHotRegion(param): any {
    let url = !param.id
      ? '/unithotregion/addUnitHotRegion'
      : '/unithotregion/modifyUnitHotRegion';
    return this.http.post(url, param);
  }

  deleteUnitHotRegionById(id): any {
    return this.http.post('/unithotregion/deleteUnitHotRegionById', id);
  }
}

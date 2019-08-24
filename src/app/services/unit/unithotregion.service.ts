import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnithotregionService {
  constructor(private http: HttpClient) {}

  insertRegionsBatch(param): any {
    return this.http.post('/unithotregion/insertRegionsBatch', param);
  }

  getUnitHotRegionListByUnitId(unitId): any {
    return this.http.post(
      '/unithotregion/getUnitHotRegionListByUnitId',
      unitId
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HaqjdyService {




    constructor(private http: HttpClient) { }


    getSupervisionSupervisorList(param): any {
        return this.http.post('/SupervisionSupervisor/getSupervisionSupervisorList', param);
    }

    saveOrUpdateSupervisionSupervisor(param): any {
        return this.http.post( '/SupervisionSupervisor/saveOrUpdateSupervisionSupervisor', param);
    }

    deleteSupervisionSupervisorById(id): any {
        return this.http.get('/SupervisionSupervisor/deleteSupervisionSupervisorById?id=' + id);
    }

    getSupervisionSupervisorById(id):any{
        return this.http.get('/SupervisionSupervisor/getSupervisionSupervisorById?id=' + id);
    }
}

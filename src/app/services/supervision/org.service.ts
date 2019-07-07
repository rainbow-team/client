import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrgSercice {

    constructor(private http: HttpClient) { }

    getAllOrgList(): any {
        return this.http.post('/org/getAllOrgList', null);
    }
}
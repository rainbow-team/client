import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StaffSercice {

    staffObj: any = null;

    constructor() { }


    getStaffObj(): any {
        return this.staffObj;
    }

    setStaffObj(item): any {
        this.staffObj = item;
    }

}

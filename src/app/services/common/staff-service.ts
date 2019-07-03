import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StaffSercice {

    constructor() { }


    getStaffObj(): any {

        let staffObj = sessionStorage.getItem("staffObj");

        if (staffObj) {
            return JSON.parse(staffObj);
        } else {
            return {};
        }
    }

    setStaffObj(item): any {

        let staffObj = JSON.stringify(item);
        sessionStorage.setItem("staffObj", staffObj);

    }

}

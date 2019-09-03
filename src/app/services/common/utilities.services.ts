import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesSercice {




    constructor(private http: HttpClient) { }


    checkPermission(param): any {
       
        let result = false;
        let pers = sessionStorage.getItem("permission");
        if(pers){

            let items = JSON.parse(pers);
            let data = items.filter(function(item){
                return item == param;
            })
            result = data&&data.length>0?true:false;
        }

        return result;
    }

   


}

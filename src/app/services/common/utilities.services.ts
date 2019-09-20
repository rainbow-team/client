import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesSercice {




    constructor(private http: HttpClient,private cookieService: CookieService) { }


    checkPermission(param): any {

        let result = false;
        let pers = sessionStorage.getItem("permission");
        if (pers) {

            let items = JSON.parse(pers);
            let data = items.filter(function (item) {
                return item == param;
            })
            result = data && data.length > 0 ? true : false;
        }

        return result;
    }

    wrapUrl(url): any {
        
        let authID = sessionStorage.getItem('AUTH_ID');
        var p = 'AUTH_ID=' + encodeURIComponent(authID);
        if (url.indexOf('?') >= 0) {
            url += '&' + p;
        }
        else {
            url += '?' + p;
        }
        return url;
    }





}

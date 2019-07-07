import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DictionarySercice {

    constructor(private http: HttpClient) { }


    getAllConfig(isInit=false): any {

        let dics = localStorage.getItem("dics");
        if (dics && !isInit) {
            return JSON.parse(dics);
        } else {
            this.http.get('/config/getAllConfig').subscribe(
                (res): any => {
                    localStorage.setItem("dics", JSON.stringify(res));
                    return res;
                }
            )
        }
    }


}

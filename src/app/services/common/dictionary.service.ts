import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DictionarySercice {

    dictionaryList: any = null;


    constructor(private http: HttpClient) { }


    getAllConfig(): any {

        if(this.dictionaryList){
            return this.dictionaryList;
        }else{
            this.http.get('/config/getAllConfig').subscribe(
                (res)=>{
                    this.dictionaryList = res;
                    return this.dictionaryList;
                }
            )
        }
        
        
    }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AttachmentSercice {




    constructor(private http: HttpClient) { }


    deleteFileById(param): any {
        return this.http.get('/fileInfo/delete?id='+param);
    }

    getFileListById(param):any{
        return this.http.get('/fileInfo/getFileListById?id='+param);
    }

    saveFileLog(param):any{
        return this.http.post('/fileInfo/saveFileLog',param);
    }

}

import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';
import { Console } from '@angular/core/src/console';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';




@Injectable()
export class HttpRestService {
    //#region  变量
    private COOKIE_SESSION = 'MANGOSTEEN_SESSION';
    httpHeader: HttpHeaders;
    //#endregion


    // httpclient 默认json格式不需要手动map
    // 支持请求拦截器、响应拦截器
    // 支持各种类型的数据请求
    constructor(private _httpClient: HttpClient, private http: Http, ) {
        this.httpHeader = new HttpHeaders();
        this.updateAccessToken();
    }

    updateAccessToken() {
        this.httpHeader = this.httpHeader.set('Content-Type', 'application/json');
        this.httpHeader = this.httpHeader.set('charset', 'UTF-8');
    }
    get<T>(url) {
        url = AppConfig.Configuration.baseUrl + url;
        return this._httpClient.get<T>(url, { withCredentials: true }).toPromise()
            .catch(ex => {
                let t: T;
                return t;
            });
    }

    post<T>(url, data) {
        url = AppConfig.serviceAddress;+ url;
        return this._httpClient.post<T>(url, data).toPromise()
            .catch(ex => {
                let t: T;
                return t;
            });
    }

    // get(url) {
    //   url = AppConfig.Configuration.baseUrl + url;
    //   return  this.http.get( url,{withCredentials: true}).map(res => res.json()).toPromise() ;
    // }

    // post(url , data) {
    //     url = AppConfig.Configuration.baseUrl + url;
    //     return  this.http.post( url, data ,{withCredentials: true}).map(res => res.json()).toPromise();  
    //   }

    down(url) {
        url = AppConfig.Configuration.baseUrl + url;
        return this.http.get(url, { withCredentials: true }).toPromise();
    }



    // POST stream 数据到服务器的时候，不指定 Content-Type，但是之后需要通过 Header 传递 Token
    // 所以需要一个单独的方法。
    post_raw(url, data, host?) {
        var hostUrl = AppConfig.Configuration.baseUrl;
        if (host == 'portals') {
            hostUrl = AppConfig.Configuration.basePortalsUrl;
        } else if (host == 'auth') {
            hostUrl = AppConfig.Configuration.baseAuthUrl;
        }
        url = hostUrl + url;
        return this._httpClient.post(url, data, { headers: this.httpHeader.set('Content-Type', '') });
    }
}
export class ServiceResponse<T> {
    public Code: number;
    public Data: T;
    public Message: string;
}


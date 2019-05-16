import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class HandleHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        let authReq = req;
        let requestUrl = req.url;

        // 添加接口地址前缀
        if (!requestUrl.startsWith('http')) {
            // 从配置中获取服务地址
            const urlPrefix: string = AppConfig.serviceAddress;
            if (urlPrefix) {
                // 去掉传入地址中的前/
                if (requestUrl.startsWith('/')) {
                    requestUrl = requestUrl.substring(1);
                }
                // 拼接地址
                if (urlPrefix.endsWith('/')) {
                    requestUrl = urlPrefix + requestUrl;
                } else {
                    requestUrl = urlPrefix + '/' + requestUrl;
                }
                // 修改请求地址
                authReq = req.clone({
                    url: requestUrl
                });
            }
        }

        if (requestUrl.indexOf("upload") > -1) {
            
        } else {
            // 添加请求头
            authReq = authReq.clone({
                headers: req.headers.set('Content-Type', "application/json;charset=UTF-8")
            });
        }

        return next.handle(authReq)
            .pipe(map(
                event => {
                    return event;
                }
            ), catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMsg;
        if (error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = error.message;
            console.error(`接口逻辑异常:` + error.message);
        } else if (error instanceof HttpErrorResponse) {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = error.statusText;
            console.error(`接口请求异常:` +
                `接口地址 ${error.url}, ` +
                `状态码： ${error.status}, ` +
                `错误信息: ${error.error}`);
        } else {
            errorMsg = '未知错误';
        }
        return throwError({
            message: errorMsg
        });
    }
}
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, finalize, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class HandleHttpInterceptor implements HttpInterceptor {


    constructor(private cookieService: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        let authID = sessionStorage.getItem('AUTH_ID');
        authID = authID ? authID : "";

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

        if (requestUrl.indexOf("upload") > -1 || requestUrl.indexOf("import") > -1) {
            authReq = authReq.clone({
                headers: req.headers.append("AUTH_ID", authID)
            });
        } else {
            // 添加请求头
            authReq = authReq.clone({
                headers: req.headers.set('Content-Type', "application/json;charset=UTF-8")
                    .append("AUTH_ID", authID)
            });
        }

        return next.handle(authReq)
            .pipe(map(
                event => {
                    return event;
                }
            ), catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {

        let errorMsg;
        if (error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = error.message;


            console.error(`接口逻辑异常:` + error.message);
        } else if (error instanceof HttpErrorResponse) {

            if (error.status == 403) {
                sessionStorage.removeItem("staffObj");

                window.alert("登录信息过期,3秒后将跳转至登录页面");
                setTimeout(() => {

                    window.location.href = AppConfig.clientAddress+"/#/login"
                }, 3000);

            }

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
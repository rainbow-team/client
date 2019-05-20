import { Component, OnInit } from '@angular/core';
import { SupervisionSercice } from '../../../../services/supervision/supervision.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
    selector: 'app-supervision-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

    public dataSet: any;
    public data = {};
    public selectData: any = {};
    public name: any = "";
    public selectedIndex: any = 0;
    constructor(private supervisionSercice: SupervisionSercice,private http:HttpClient) { }

    ngOnInit() {

        this.select();
    }

    Submit() {
        var that =this;
        this.supervisionSercice.saveOrUpdateSupervisionSupervisor(this.data).subscribe(
            (res) => {
                that.selectedIndex = 0;
                that.select();
            }
        );
    }

    clickList(data) {
        this.selectData = data;
    }

    update() {
        var that =this;
        this.supervisionSercice.getSupervisionSupervisorById(this.selectData.id).subscribe(
            (res) => {
                that.selectedIndex = 1;
                that.data = res.msg;
            }
        );
    }

    add() {
        this.selectedIndex = 1;
        this.data = {};
    }

    delete() {
        this.supervisionSercice.deleteSupervisionSupervisorById(this.selectData.id).subscribe(
            (res) => {
                this.select();
            }
        );
    }

    select() {
        var option = {
            name: this.name ? this.name : ""
        }
        this.supervisionSercice.getSupervisionSupervisorList(option).subscribe(
            (data) => {
                let res = data;
                this.dataSet = res.msg;
                if (this.dataSet != null && this.dataSet.length > 0) {
                    this.selectData = this.dataSet[0];
                }
            }
        );
    }



    customReq = (item: UploadXHRArgs) => {
        // 构建一个 FormData 对象，用于存储文件或其他参数
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        formData.append('file', item.file as any);
        formData.append('filename', item.file.name);
        const req = new HttpRequest('POST', item.action, formData, {
            reportProgress: true,
            withCredentials: false
        });
        // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
        return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    // tslint:disable-next-line:no-any
                    (event as any).percent = event.loaded / event.total * 100;
                }
                // 处理上传进度条，必须指定 `percent` 属性来表示进度
                item.onProgress(event, item.file);
            } else if (event instanceof HttpResponse) {
                // 处理成功
                item.onSuccess(event.body, item.file, event);
            }
        }, (err) => {
            // 处理失败
            item.onError(err, item.file);
        });
    }

}

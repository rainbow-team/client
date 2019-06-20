import { Component, OnInit } from '@angular/core';
import { SupervisionSercice } from '../../../../services/supervision/supervision.service';
import { AttachmentSercice } from '../../../../services/common/attachment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { from } from 'rxjs';
@Component({
    selector: 'app-supervision-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

    public dataSet: any;
    public data: any = {};
    public selectData: any = {};
    public name: any = "";
    public selectedIndex: any = 0;
    public attachmentList: any = [];

    nestedTableData = [];
    innerTableData = [];
    
    constructor(private supervisionSercice: SupervisionSercice, private attachmentSercice: AttachmentSercice, private http: HttpClient) { }

    ngOnInit() {
        for (let i = 0; i < 3; ++i) {
            this.nestedTableData.push({
                key: i,
                name: 'Screem',
                platform: 'iOS',
                version: '10.3.4.5654',
                upgradeNum: 500,
                creator: 'Jack',
                createdAt: '2014-12-24 23:12:00',
                expand: false
            });
        }
        for (let i = 0; i < 3; ++i) {
            this.innerTableData.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        this.select();
    }

    Submit() {
        var that = this;
        this.data.attachmentList = [];

        if (this.attachmentList.length > 0) {
            this.attachmentList.forEach(element => {
                this.data.attachmentList.push({ fileinfoId: element.response.msg });
            });
        }
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
        var that = this;
        this.supervisionSercice.getSupervisionSupervisorById(this.selectData.id).subscribe(
            (res) => {
                that.selectedIndex = 1;
                that.data = res.msg;

                this.attachmentList = [];
                if (that.data.attachmentList && that.data.attachmentList.length > 0) {
                    that.data.attachmentList.forEach(element => {
                        this.attachmentList.push(
                            {
                                uid: element.fileinfoId,
                                name: element.fileinfoClientFileName,
                                response: {
                                    msg: element.fileinfoId
                                }
                            }
                        );
                    });
                }
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
        return this.http.request(req).subscribe((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    // tslint:disable-next-line:no-any
                    (event as any).percent = event.loaded / event.total * 100;
                }
                // 处理上传进度条，必须指定 `percent` 属性来表示进度
                item.onProgress(event, item.file);
            } else if (event instanceof HttpResponse) {

                // this.attachmentList.push({
                //     uid: event.body.msg,
                //     name: item.file.name
                // });
                // 处理成功
                item.onSuccess(event.body, item.file, event);
            }
        }, (err) => {
            // 处理失败
            item.onError(err, item.file);
        });
    }

    RemoveAttachment = (file: UploadFile) => {

        if (this.data.id) {
            this.attachmentSercice.deleteFileById(file.uid).subscribe(
                (data) => {

                }
            );
        }


    }

}

import { Component, OnInit } from '@angular/core';
import { SupervisionSercice } from '../../../../services/supervision/supervision.service';
import { UploadXHRArgs, UploadFile, NzMessageService } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-supervision-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

    public dataSet: any;

    name: any = "";
    orgId: any = "";

    pageIndex: any = 1;
    pageSize: any = 10;
    totalCount: any = 0;

    ids: any = [];
    allChecked: any = false;
    indeterminate: any = false;

    constructor(private supervisionSercice: SupervisionSercice, private http: HttpClient, private router: Router, private msg: NzMessageService) { }

    ngOnInit() {
        this.search();
    }

    add() {
        this.router.navigate(['/index/supersivion/supervisor/add']);
    }

    show(item, flag) {
        this.router.navigate(['/index/supersivion/supervisor/add'], { queryParams: { id: item.id, flag: flag } });
    }

    goChildManage(item) {
        this.router.navigate(['/index/supersivion/supervisor/childmanage'], { queryParams: { id: item.id } });
    }

    search() {
        var option = {
            pageNo: this.pageIndex,
            pageSize: this.pageSize,
            conditions: []
        }

        if (this.name) {
            option.conditions.push({ key: "name", value: this.name })
        }
        if (this.orgId) {
            option.conditions.push({ key: "orgId", value: this.orgId })
        }

        this.supervisionSercice.getSupervisionSupervisorList(option).subscribe(
            (data) => {
                this.dataSet = data.msg.currentList;
                this.dataSet = this.dataSet.map(r => { return Object.assign(r, { checked: false }) });
                this.totalCount = data.msg.recordCount;
            }
        );
    }

    refreshStatus() {
        const allChecked = this.dataSet.every(value => value.checked === true);
        const allUnChecked = this.dataSet.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }

    checkAll(value: boolean): void {
        this.dataSet.forEach(data => data.checked = value);
        this.refreshStatus();
    }

    delete() {

        let checkItems = this.dataSet.filter(value => value.checked);

        if (checkItems != null && checkItems.length == 0) {
            this.msg.create("warning", "请选择删除项");
            return;
        }

        checkItems.forEach(element => {
            this.ids.push(element.id);
        });

        this.supervisionSercice.deleteSupervisionSupervisorByIds(this.ids).subscribe((res) => {
            if (res.code == 200) {
                this.msg.create("success", "删除成功");
                this.search();
            } else {
                this.msg.create("error", "删除失败");
            }
        })
    }

    pageIndexChange(num) {
        this.pageIndex = num;
        this.search();
    }

    pageSizeChange(num) {
        this.pageSize = num;
        this.pageIndex = 1;
        this.search();
    }

    reset() {
        this.name = "";
        this.orgId = "";
    }

}

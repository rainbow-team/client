import { Component, OnInit } from '@angular/core';
import { SupervisionSercice } from '../../../../services/supervision/supervisor.service';
import { UploadXHRArgs, UploadFile, NzMessageService } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrgSercice } from 'src/app/services/supervision/org.service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { UtilitiesSercice } from 'src/app/services/common/utilities.services';

@Component({
    selector: 'app-supervision-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

    dictionary: any = {};
    staffObj: any = {};

    public dataSet: any;

    name: any = "";
    orgName: any = "";
    expireDate: any = [];

    pageIndex: any = 1;
    pageSize: any = 10;
    totalCount: any = 0;

    ids: any = [];
    allChecked: any = false;
    indeterminate: any = false;

    typeIds: any = [];

    selectId: any = "";

    checked: any = false;

    uploadUrl: any = AppConfig.serviceAddress + "/Supervisor/importSupervisor";
    canManage: any = false;

    constructor(private supervisionSercice: SupervisionSercice, private http: HttpClient, private router: Router,
        private msg: NzMessageService, private dictionarySercice: DictionarySercice,
        private staffSercice: StaffSercice, private utilitiesSercice: UtilitiesSercice) { }

    ngOnInit() {

        this.dictionary = this.dictionarySercice.getAllConfig();
        this.staffObj = this.staffSercice.getStaffObj();

        this.uploadUrl = this.utilitiesSercice.wrapUrl(this.uploadUrl);

        this.canManage = this.utilitiesSercice.checkPermission("supervisor:manage");

        this.search();
    }

    add() {
        this.router.navigate(['/supersivion/supervisor/add']);
    }

    show(item) {
        this.router.navigate(['/supersivion/supervisor/add'], { queryParams: { id: item.id, isShow: true } });
    }


    modify() {
        if (this.selectId) {
            this.router.navigate(['/supersivion/supervisor/add'], { queryParams: { id: this.selectId, isShow: false } });
        } else {
            this.msg.create("warning", "请选择修改项");
        }

    }

    //导出
    exportData() {

        let start_date = "", end_date = "";
        if (this.expireDate && this.expireDate.length > 0) {
            if (this.expireDate[0]) {
                start_date = this.expireDate[0];
            }

            if (this.expireDate[1]) {
                end_date = this.expireDate[1];
            }
        }

        let url = AppConfig.serviceAddress + "/Supervisor/exportSupervisor?name=" + this.name
            + "&orgName=" + this.orgName + "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date)
            + "&typeIds=" + this.typeIds;

        url = this.utilitiesSercice.wrapUrl(url);
        window.open(url, "_blank");

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
        if (this.orgName) {
            option.conditions.push({ key: "orgName", value: this.orgName })
        }

        if (this.expireDate && this.expireDate.length > 0) {
            if (this.expireDate[0]) {
                option.conditions.push({ key: "start_date", value: this.expireDate[0] })
            }

            if (this.expireDate[1]) {
                option.conditions.push({ key: "end_date", value: this.expireDate[1] })
            }
        }

        if (this.typeIds.length > 0) {
            option.conditions.push({ key: "typeIds", value: [this.typeIds] })
        }

        if (this.checked) {
            option.conditions.push({ key: "checked", value: "checked" })
        }

        this.supervisionSercice.getSupervisorList(option).subscribe(
            (data) => {
                this.dataSet = data.msg.currentList;
                //this.dataSet = this.dataSet.map(r => { return Object.assign(r, { checked: false }) });
                this.totalCount = data.msg.recordCount;
            }
        );
    }

    // refreshStatus() {
    //     const allChecked = this.dataSet.every(value => value.checked === true);
    //     const allUnChecked = this.dataSet.every(value => !value.checked);
    //     this.allChecked = allChecked;
    //     this.indeterminate = (!allChecked) && (!allUnChecked);
    // }

    // checkAll(value: boolean): void {
    //     this.dataSet.forEach(data => data.checked = value);
    //     this.refreshStatus();
    // }

    delete() {

        // let checkItems = this.dataSet.filter(value => value.checked);

        // if (checkItems != null && checkItems.length == 0) {
        //     this.msg.create("warning", "请选择删除项");
        //     return;
        // }

        // checkItems.forEach(element => {
        //     this.ids.push(element.id);
        // });

        if (this.selectId) {
            this.supervisionSercice.deleteSupervisorById(this.selectId).subscribe((res) => {
                if (res.code == 200) {
                    this.msg.create("success", res.msg);
                    this.search();
                } else {
                    this.msg.create("error", res.msg);
                }
            })
        } else {
            this.msg.create("warning", "请选择删除项");
        }

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
        this.orgName = "";
        this.expireDate = "";
        this.selectId = "";
        this.typeIds = [];
    }

    selectItem(data) {
        this.selectId = data.id;
    }
}

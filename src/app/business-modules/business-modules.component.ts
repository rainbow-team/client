import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { LayoutChangeService } from './../layouts/services/layout-change.service';
import { DictionarySercice } from './../services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './business-modules.component.html',
    styleUrls: ['./business-modules.component.scss']
})
export class BusinessModulesComponent implements OnInit {

    //当前位置面包屑
    private breadcrumbList: any = [];
    isIndex: any = true;

    constructor(private layoutChangeService: LayoutChangeService, private dictionarySercice: DictionarySercice,
        private staffSercice: StaffSercice, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        let logUser = this.staffSercice.getStaffObj();
        if (!logUser.id) {
            this.router.navigate(['/login'])
        }
        //初始化字典
        this.dictionarySercice.getAllConfig(true);

        if (this.router.url == "/home") {
            this.isIndex = true;
        } else {
            this.isIndex = false;
        };

        switch (this.router.url) {

            case "/supersivion/sastind":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "国防科工局基本信息"];
                break;
            case "/supersivion/org":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "授权监管机构基本信息"];
                break;
            case "/supersivion/org/add":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "授权监管机构基本信息", "添加"];
                break;
            case "/supersivion/supervisor":
                this.breadcrumbList = ["监管信息", "核安全监管员信息"];
                break;
            case "/supersivion/supervisor/add":
                this.breadcrumbList = ["监管信息", "核安全监管员信息", "添加"];
                break;
            case "/supersivion/supervisor/childmanage":
                this.breadcrumbList = ["监管信息", "核安全监管员信息", "子项管理"];
                break;
            case "/supersivion/monitorTrain":
                this.breadcrumbList = ["监管信息", "核安全监督培训信息"];
                break;
            case "/supersivion/monitorTrain/add":
                this.breadcrumbList = ["监管信息", "核安全监督培训信息", "添加"];
                break;
            case "/supersivion/law":
                this.breadcrumbList = ["监管信息", "监管法规信息"];
                break;
            case "/supersivion/law/add":
                this.breadcrumbList = ["监管信息", "监管法规信息", "添加"];
                break;
            case "/system":
                this.breadcrumbList = ["系统管理"];
                break;

            default:
                break;
        }

        let data = this.activatedRoute.snapshot.data;

        // this.breadcrumbList = data.breadcrumb;

        this.layoutChangeService.routeChange.subscribe((data: any) => {
            if (data[0] == "首页") {
                this.isIndex = true;
            } else {
                this.isIndex = false;
            }


            this.breadcrumbList = data;
        });
    }



}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { LayoutChangeService } from './../layouts/services/layout-change.service';
import { DictionarySercice } from './../services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsSercice } from '../services/statistics/statistics.service';

@Component({
    templateUrl: './business-modules.component.html',
    styleUrls: ['./business-modules.component.scss']
})
export class BusinessModulesComponent implements OnInit {

    facNum: any = "0";
    umineplaceNum: any = "0";
    umineMountainNum: any = "0";
    equipNum: any = "0";

    countData: any = [];

    //当前位置面包屑
    private breadcrumbList: any = [];
    isIndex: any = true;

    constructor(private layoutChangeService: LayoutChangeService, private dictionarySercice: DictionarySercice,
        private staffSercice: StaffSercice, private router: Router, private activatedRoute: ActivatedRoute,
        private statisticsSercice: StatisticsSercice) { }

    ngOnInit() {

        let logUser = this.staffSercice.getStaffObj();
        if (!logUser.id) {
            this.router.navigate(['/login'])
        }


        if (this.router.url == "/home") {
            this.isIndex = true;
            //初始化字典
            this.dictionarySercice.getAllConfig(true);
        } else {
            this.isIndex = false;
        };

        switch (this.router.url) {

            case "/supersivion/sastind":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "国防科工局基本信息"];
                break;
            case "/supersivion/sastind/add":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "国防科工局基本信息", "添加"];
                break;
            case "/supersivion/org":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "授权监管机构基本信息"];
                break;
            case "/supersivion/org/add":
                this.breadcrumbList = ["监管信息", "核安全监管机构信息", "授权监管机构基本信息", "添加"];
                break;
            case "/supersivion/supervisor":
                this.breadcrumbList = ["监管信息", "核安全监督员信息"];
                break;
            case "/supersivion/supervisor/add":
                this.breadcrumbList = ["监管信息", "核安全监督员信息", "添加"];
                break;
            case "/supersivion/supervisor/childmanage":
                this.breadcrumbList = ["监管信息", "核安全监督员信息", "子项管理"];
                break;
            case "/supersivion/monitorTrain":
                this.breadcrumbList = ["监管信息", "核安全监督培训信息"];
                break;
            case "/supersivion/monitorTrain/add":
                this.breadcrumbList = ["监管信息", "核安全监督培训信息", "添加"];
                break;
            case "/supersivion/producetrain":
                this.breadcrumbList = ["监管信息", "安全生产培训信息"];
                break;
            case "/supersivion/producetrain/add":
                this.breadcrumbList = ["监管信息", "安全生产培训信息", "添加"];
                break;
            case "/supersivion/expert":
                this.breadcrumbList = ["监管信息", "核安全监督专家信息"];
                break;
            case "/supersivion/expert/add":
                this.breadcrumbList = ["监管信息", "核安全监督专家信息", "添加"];
                break;
            case "/supersivion/law":
                this.breadcrumbList = ["监管信息", "监管法规信息"];
                break;
            case "/supersivion/law/add":
                this.breadcrumbList = ["监管信息", "监管法规信息", "添加"];
                break;
            case "/supersivion/welder":
                this.breadcrumbList = ["监管信息", "焊接人员资质信息"];
                break;
            case "/supersivion/welder/add":
                this.breadcrumbList = ["监管信息", "焊接人员资质信息", "添加"];
                break;
            case "/supersivion/breakchecker":
                this.breadcrumbList = ["监管信息", "无损检验人员资质信息"];
                break;
            case "/supersivion/breakchecker/add":
                this.breadcrumbList = ["监管信息", "无损检验人员资质信息", "添加"];
                break;
            case "/supersivion/operatorlisence":
                this.breadcrumbList = ["监管信息", "研究堆操纵员执照信息"];
                break;
            case "/supersivion/operatorlisence/add":
                this.breadcrumbList = ["监管信息", "研究堆操纵员执照信息", "添加"];
                break;
            case "/unit/group":
                this.breadcrumbList = ["营运单位及设施", "集团信息"];
                break;
            case "/unit/group/add":
                this.breadcrumbList = ["营运单位及设施", "集团信息", "添加"];
                break;
            case "/system":
                this.breadcrumbList = ["系统管理"];
                break;

            default:
                break;
        }

        this.layoutChangeService.routeChange.subscribe((data: any) => {
            if (data[0] == "首页") {
                this.isIndex = true;
            } else {
                this.isIndex = false;
            }


            this.breadcrumbList = data;
        });

        if (this.isIndex) {
            this.statisticsSercice.getHomeNumer().subscribe(
                (res) => {
                    this.countData = res.msg;
                    this.facNum = this.countData["fac"];
                    this.umineplaceNum = this.countData["umineplace"];
                    this.umineMountainNum = this.countData["uminemountain"];
                    this.equipNum = this.countData["equip"];
                }
            );
        }
    }



}

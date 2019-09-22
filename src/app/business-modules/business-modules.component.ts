import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { LayoutChangeService } from './../layouts/services/layout-change.service';
import { DictionarySercice } from './../services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsSercice } from '../services/statistics/statistics.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ignoreElements } from 'rxjs/operators';

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

    navMenu: NavMenu = [
        {
            name: '首页',
            id: 'home',
            route: '/home',
            isShow: true,
            breadcrumbList: ["首页"]
        },
        {
            name: '监管信息',
            id: 'supersivion',
            children: [
                {
                    name: '核安全监管机构信息',
                    id: 'SafetyRegulator',
                    route: '',
                    children: [
                        {
                            name: '国防科工局基本信息',
                            id: 'sastind',
                            route: '/supersivion/sastind',
                            breadcrumbList: ["监管信息", "核安全监管机构信息", "国防科工局基本信息"]
                        },
                        {
                            name: '授权监管机构基本信息',
                            id: 'supersivionOrg',
                            route: '/supersivion/org',
                            breadcrumbList: ["监管信息", "核安全监管机构信息", "授权监管机构基本信息"]
                        }
                    ]
                },
                {
                    name: '核安全监督员信息',
                    id: 'supervisor',
                    route: '/supersivion/supervisor',
                    breadcrumbList: ["监管信息", "核安全监督员信息"]
                },
                {
                    name: '核安全监督培训信息',
                    id: 'monitorTrain',
                    route: '/supersivion/monitorTrain',
                    breadcrumbList: ["监管信息", "核安全监督培训信息"]
                },
                { name: '监管法规信息', id: 'law', route: '/supersivion/law', breadcrumbList: ["监管信息", "监管法规信息"] },
                {
                    name: '安全生产培训信息',
                    id: 'producetrain',
                    route: '/supersivion/producetrain',
                    breadcrumbList: ["监管信息", "安全生产培训信息"]
                },
                {
                    name: '核安全监督专家信息',
                    id: 'expert',
                    route: 'supersivion/expert',
                    breadcrumbList: ["监管信息", "核安全监督专家信息"]
                },
                {
                    name: '焊接人员资质信息',
                    id: 'welder',
                    route: '/supersivion/welder',
                    breadcrumbList: ["监管信息", "焊接人员资质信息"]
                },
                {
                    name: '无损检验人员资质信息',
                    id: 'breakchecker',
                    route: '/supersivion/breakchecker',
                    breadcrumbList: ["监管信息", "无损检验人员资质信息"]
                },
                {
                    name: '研究堆操纵员执照信息',
                    id: 'operatorlisence',
                    route: '/supersivion/operatorlisence',
                    breadcrumbList: ["监管信息", "研究堆操纵员执照信息"]
                }
            ]
        },
        {
            name: '营运单位及设施',
            id: 'unit',
            route: '',
            children: [
                { name: '集团信息', id: 'group', route: '/unit/group', breadcrumbList: ["营运单位及设施", "集团信息"] },
                {
                    name: '核设施营运单位信息',
                    id: 'servicedepart',
                    route: '/unit/servicedepart',
                    breadcrumbList: ["营运单位及设施", "核设施营运单位信息"]
                },
                { name: '铀矿冶单位信息', id: 'umine', route: '/unit/umine', breadcrumbList: ["营运单位及设施", "铀矿冶单位信息"] },
                {
                    name: '核设备单位信息',
                    id: 'equipdepart',
                    route: '/unit/equipdepart',
                    breadcrumbList: ["营运单位及设施", "核设备单位信息"]
                },
                { name: '核设施信息', id: 'fac', route: '/unit/fac', breadcrumbList: ["营运单位及设施", "核设施信息"] },
                {
                    name: '铀尾矿（渣）库信息',
                    id: 'umineplace',
                    route: '/unit/umineplace',
                    breadcrumbList: ["营运单位及设施", "铀尾矿（渣）库信息"]
                },
                {
                    name: '铀矿山信息',
                    id: 'uminemountain',
                    route: '/unit/uminemountain',
                    breadcrumbList: ["营运单位及设施", "铀矿山信息"]
                }
            ]
        },
        {
            name: '核安全许可',
            id: 'permit',
            route: '',
            children: [
                { name: '核设施许可信息', id: 'fac', route: '/permit/fac', breadcrumbList: ["核安全许可", "核安全许可"] },
                { name: '核安全设备许可信息', id: 'equip', route: '/permit/equip', breadcrumbList: ["核安全许可", "核安全设备许可信息"] },
                { name: '核活动许可信息', id: 'activity', route: '/permit/activity', breadcrumbList: ["核安全许可", "核活动许可信息"] },
                {
                    name: '铀尾矿（渣）库许可信息',
                    id: 'umineplace',
                    route: '/permit/umineplace',
                    breadcrumbList: ["核安全许可", "铀尾矿（渣）库许可信息"]
                },
                {
                    name: '铀矿山井下消防许可信息',
                    id: 'uminemountain',
                    route: '/permit/uminemountain',
                    breadcrumbList: ["核安全许可", "铀矿山井下消防许可信息"]
                }
            ]
        },
        {
            name: '核安全审评',
            id: 'check',
            route: '',
            children: [
                { name: '核设施审评信息', id: 'fac', route: '/check/fac', breadcrumbList: ["核安全审评", "核设施审评信息"] },
                { name: '核安全设备审评信息', id: 'equip', route: '/check/equip', breadcrumbList: ["核安全审评", "核安全设备审评信息"] },
                {
                    name: '核活动及其他审评信息',
                    id: 'activity',
                    route: '/check/activity',
                    breadcrumbList: ["核安全审评", "核活动及其他审评信息"]
                },
                {
                    name: '铀尾矿（渣）库审评信息',
                    id: 'umineplace',
                    route: '/check/umineplace',
                    breadcrumbList: ["核安全审评", "铀尾矿（渣）库审评信息"]
                },
                {
                    name: '铀矿山井下消防审查信息',
                    id: 'uminemountain',
                    route: '/check/uminemountain',
                    breadcrumbList: ["核安全审评", "铀矿山井下消防审查信息"]
                }
            ]
        },
        {
            name: '核安全监督',
            id: 'monitor',
            route: '',
            children: [
                { name: '日常监督信息', id: 'daily', route: '/monitor/daily', breadcrumbList: ["核安全监督", "日常监督信息"] },
                { name: '监督检查信息', id: 'check', route: '/monitor/check', breadcrumbList: ["核安全监督", "监督检查信息"] },
                { name: '监督见证信息', id: 'witness', route: '/monitor/witness', breadcrumbList: ["核安全监督", "监督见证信息"] },
                { name: '监督报告信息', id: 'report', route: '/monitor/report', breadcrumbList: ["核安全监督", "监督报告信息"] }
            ]
        },
        {
            name: '安全信息',
            id: 'security',
            route: '',
            children: [
                { name: '核设施安全问题', id: 'fac', route: '/security/fac', breadcrumbList: ["安全信息", "核设施安全问题"] },
                { name: '核安全设备安全问题', id: 'equip', route: '/security/equip', breadcrumbList: ["安全信息", "核安全设备安全问题"] },
                {
                    name: '铀尾矿(渣)库安全问题',
                    id: 'umineplace',
                    route: '/security/umineplace',
                    breadcrumbList: ["安全信息", "铀尾矿(渣)库安全问题"]
                },
                { name: '事故事件', id: 'accident', route: '/security/accident', breadcrumbList: ["安全信息", "事故事件"] }
            ]
        },
        {
            name: '统计分析',
            id: 'statistics',
            route: '/statistics',
            breadcrumbList: ["统计分析"]
        },
        {
            name: '数据迁移',
            id: 'dataMigration',
            route: '/dataMigration',
            breadcrumbList: ["数据迁移"]
        },
        {
            name: '查询展示',
            id: 'searchShow',
            route: '',
            children: [
                {
                    name: '综合查询',
                    id: 'integratedAuery',
                    route: '/searchShow/integratedAuery',
                    breadcrumbList: ["查询展示", "综合查询"]
                },
                {
                    name: '模拟展示', id: 'simulation', route: '/searchShow/simulation',
                    breadcrumbList: ["查询展示", "模拟展示"]
                }
            ]
        },
        {
            name: '系统设置',
            id: 'system',
            route: '/system',
            children: [],
            breadcrumbList: ["系统设置"]
        }
    ];

    constructor(private layoutChangeService: LayoutChangeService, private dictionarySercice: DictionarySercice,
        private staffSercice: StaffSercice, private router: Router, private activatedRoute: ActivatedRoute,
        private statisticsSercice: StatisticsSercice, private msg: NzMessageService) { }

    ngOnInit() {

        let logUser = this.staffSercice.getStaffObj();
        if (!logUser.id && this.router.url != "/login") {
            this.router.navigate(['/login'])
        }

        if (this.router.url == "/home") {
            this.isIndex = true;
            //初始化字典
            this.dictionarySercice.getAllConfig(true);
        } else {
            this.isIndex = false;
        };

        this.breadcrumbList = this.getBreadcrumbList(this.navMenu);




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


    getBreadcrumbList(data) {

        let result = [];
        for (let i = 0; i < data.length; i++) {

            let url = this.router.url;
            if (url.indexOf("?") > -1) {
                url = url.substring(0, url.indexOf("?"));
            }

            if (url.indexOf(data[i].route) > -1 && data[i].route) {
                result = data[i].breadcrumbList;
                break;
            }

            if (data[i].children != null && data[i].children.length > 0) {
                result = this.getBreadcrumbList(data[i].children);
                if (result && result.length > 0) {
                    break;
                }
            }

        }

        return result;
    }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { StaffSercice } from 'src/app/services/common/staff-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navMenu: NavMenu = [
    {
      name: '首页', id: 'home', route: '/home'
    },
    {
      name: '监管信息', id: 'supersivion',
      children: [
        {
          name: '核安全监管机构信息', id: '', route: '',
          children: [
            { name: '国防科工局基本信息', id: 'sastind', route: '/supersivion/sastind' },
            { name: '授权监管机构基本信息', id: 'org', route: '/supersivion/org' }
          ]
        },
        {
          name: '核安全监管员信息', id: 'supervisor', route: '/supersivion/supervisor'
        },
        { name: '核安全监督培训信息', id: 'monitorTrain', route: '/supersivion/monitorTrain' },
        { name: '监管法规信息', id: 'law', route: '/supersivion/law' },
        { name: '安全生产培训信息', id: 'producetrain', route: '/supersivion/producetrain' },
        { name: '核安全监督专家信息', id: 'expert', route: 'supersivion/expert' },
        { name: '焊接人员资质信息', id: 'welder', route: '/supersivion/welder' },
        { name: '无损检验人员资质信息', id: 'breakchecker', route: '/supersivion/breakchecker' },
        { name: '研究堆操纵员执照信息', id: 'operatorlisence', route: '/supersivion/operatorlisence' }
      ]
    },
    {
      name: '营运单位及设施', id: 'unit', route: '',
      children: [
        { name: '集团信息', id: 'group', route: '/unit/group' },
        { name: '核设施营运单位信息', id: 'servicedepart', route: '/unit/servicedepart' },
        { name: '铀矿冶单位信息', id: 'umine', route: '/unit/umine' },
        { name: '核设备单位信息', id: 'equipdepart', route: '/unit/equipdepart' },
        { name: '核设施信息', id: 'fac', route: '/unit/fac' },
        { name: '铀尾矿（渣）库信息', id: 'umineplace', route: '/unit/umineplace' },
        { name: '铀矿山信息', id: 'uminemountain', route: '/unit/uminemountain' }
      ]
    },
    {
      name: '核安全许可', id: 'permit', route: '',
      children: [
        { name: '核设施许可信息', id: 'fac', route: '/permit/fac' },
        { name: '核安全设备许可信息', id: 'equip', route: '/permit/equip' },
        { name: '核活动许可信息', id: 'activity', route: '/permit/activity' },
        { name: '铀尾矿（渣）库许可信息', id: 'umineplace', route: '/permit/umineplace' },
        { name: '铀矿山井下消防许可信息', id: 'uminemountain', route: '/permit/uminemountain' }
      ]
    },
    {
      name: '核安全审评', id: 'check', route: '',
      children: [
        { name: '核设施审评信息', id: 'fac', route: '/check/fac' },
        { name: '核安全设备审评信息', id: 'equip', route: '/check/equip' },
        { name: '核活动及其他审评信息', id: 'activity', route: '/check/activity' },
        { name: '铀尾矿（渣）库审评信息', id: 'umineplace', route: '/check/umineplace' },
        { name: '铀矿山井下消防审查信息', id: 'uminemountain', route: '/check/uminemountain' }
      ]
    },
    {
      name: '核安全监督', id: 'monitor', route: '',
      children: [
        { name: '日常监督信息', id: 'daily', route: '/monitor/daily' },
        { name: '监督检查信息', id: 'check', route: '/monitor/check' },
        { name: '监督见证信息', id: 'witness', route: '/monitor/witness' },
        { name: '监督报告信息', id: 'report', route: '/monitor/report' }
      ]
    },
    {
      name: '安全信息', id: 'security', route: '',
      children: [
        { name: '核设施安全问题', id: 'fac', route: '/security/fac' },
        { name: '核安全设备安全问题', id: 'equip', route: '/security/equip' },
        { name: '单位及铀尾矿（渣）库安全问题', id: 'umineplace', route: '/security/umineplace' },
        { name: '事故事件', id: 'accident', route: '/security/accident' }
      ]
    },
    {
      name: '统计分析', id: 'statistics', route: '/statistics'
    }, {
      name: '数据迁移', id: 'sjqy', route: '',
    },
    {
      name: '查询展示', id: 'searchShow', route: '',
      children: [
        { name: '综合查询', id: '', route: '/searchShow/integratedAuery' },
        { name: '模拟展示', id: '', route: '' }
      ]
    },
    {
      name: '系统设置', id: 'system', route: '/system',
      children: []
    }
  ];

  name:any="";

  constructor(private router: Router,private modal: NzModalService,private staffSercice: StaffSercice) { }

  ngOnInit() {
    this.name = this.staffSercice.getStaffObj().username;
  }

  exitSystem() {
    this.modal.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定退出系统？</b>',
      nzOnOk: () => this.router.navigate(['/login'])
    });
  }
}

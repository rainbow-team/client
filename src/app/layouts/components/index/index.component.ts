import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //当前位置面包屑
  private breadcrumbList: any = [];

  navMenu: NavMenu = [
    {
      name: '首页', id: 'home', route: 'index/home'
    },
    {
      name: '监管信息', id: 'supersivion',
      children: [
        {
          name: '核安全监管机构信息', id: '', route: '',
          children: [
            { name: '国防科工局基本信息', id: '', route: '' },
            { name: '授权监管机构基本信息', id: '', route: '' }
          ]
        },
        {
          name: '核安全监管员信息', id: 'supervisor', route: 'index/supersivion/supervisor'
        },
        { name: '监管法规信息', id: '', route: '' },
        { name: '除核电外安全生产培训信息', id: '', route: '' },
        { name: '核安全监督专家信息', id: '', route: '' },
        { name: '焊接人员资质信息', id: '', route: '' },
        { name: '无损检验人员资质信息', id: '', route: '' },
        { name: '研究堆操纵员执照信息', id: '', route: '' }
      ]
    },
    {
      name: '营运单位及设施', id: 'yydwjss', route: '',
      children: [
        { name: '集团信息', id: '', route: '' },
        { name: '核设施营运单位信息', id: '', route: '' },
        { name: '铀矿冶单位信息', id: '', route: '' },
        { name: '核安全设备单位信息', id: '', route: '' },
        { name: '核设施信息', id: '', route: '' },
        { name: '铀尾矿（渣）库信息', id: '', route: '' },
        { name: '铀矿山信息', id: '', route: '' }
      ]
    },
    {
      name: '核安全许可', id: 'haqxk', route: '',
      children: [
        { name: '核设施许可信息', id: '', route: '' },
        { name: '核安全设备许可信息', id: '', route: '' },
        { name: '核活动许可信息', id: '', route: '' },
        { name: '铀尾矿（渣）库许可信息', id: '', route: '' },
        { name: '铀矿山井下消防许可信息', id: '', route: '' }
      ]
    },
    {
      name: '核安全审评', id: 'haqps', route: '',
      children: [
        { name: '核设施审评信息', id: '', route: '' },
        { name: '核安全设备审评信息', id: '', route: '' },
        { name: '核活动及其他审评信息', id: '', route: '' },
        { name: '铀尾矿（渣）库审评信息', id: '', route: '' },
        { name: '铀矿山井下消防审查信息', id: '', route: '' }
      ]
    },
    {
      name: '核安全监督', id: 'haqjd', route: '',
      children: [
        { name: '日常监督信息', id: '', route: '' },
        { name: '监督检查信息', id: '', route: '' },
        { name: '监督见证信息', id: '', route: '' },
        { name: '监督报告信息', id: '', route: '' }
      ]
    },
    {
      name: '安全信息', id: 'aqxx', route: '',
      children: [
        { name: '单位及核设施安全问题', id: '', route: '' },
        { name: '单位及核安全设备安全问题', id: '', route: '' },
        { name: '单位及铀尾矿（渣）库安全问题', id: '', route: '' },
        { name: '事故事件', id: '', route: '' }
      ]
    },
    {
      name: '统计分析', id: 'tjfx', route: '',
      children: [
        { name: '核设施统计', id: '', route: '' },
        { name: '核安全许可统计', id: '', route: '' },
        { name: '核安全审评统计', id: '', route: '' },
        { name: '核安全监督统计', id: '', route: '' },
        { name: '安全问题统计', id: '', route: '' },
        { name: '安全问题统计', id: '', route: '' },
        { name: '事故事件统计', id: '', route: '' }
      ]
    },
    {
      name: '系统设置', id: 'xtsz', route: '',
      children: [
        { name: '组织机构管理', id: '', route: '' },
        { name: '用户管理', id: '', route: '' },
        { name: '角色权限管理', id: '', route: '' },
        { name: '日志管理', id: '', route: '' },
        { name: '静态数据', id: '', route: '' },
        { name: '数据迁移', id: '', route: '' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {

  }

  changeBreadcrumb(data) {
    this.breadcrumbList = data;
  }

}

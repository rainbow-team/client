import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NavMenu } from 'src/app/utilities/entities/navMenu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
        { name: '核安全监督培训信息', id: 'monitorTrain', route: 'index/supersivion/monitorTrain' },
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
    }, {
      name: '数据迁移', id: 'sjqy', route: '',
    },
    {
      name: '查询展示', id: 'cxzs', route: ''

    },
    {
      name: '系统设置', id: 'xtsz', route: 'index/system',
      children: []
    }
  ];


  constructor(private router: Router,
    private modal: NzModalService) { }

  ngOnInit() {
  }

  exitSystem() {
    this.modal.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定退出系统？</b>',
      nzOnOk: () => this.router.navigate(['/login'])
    });
  }
}

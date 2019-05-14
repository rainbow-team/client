import { Component, OnInit } from '@angular/core';
import { NavMenu } from 'src/app/utilities/entities/navMenu';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  navMenuWidth = 200;

  navMenu: NavMenu = [
    { name: '套合设置', id: 'thsz', route: '/setting/thsz' },
    { name: '参数设置', id: 'cssz', route: '/setting/cssz' },
    { name: '机构人员管理', id: 'jgry', route: '/setting/jgry' },
    { name: '岗位管理', id: 'gwgl', route: '/setting/gwgl' },
    { name: '图层管理', id: 'tcgl', route: '/setting/tcgl' },
    { name: '核安全监督员', id: 'haqjdy', route: '/setting/haqjdy' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

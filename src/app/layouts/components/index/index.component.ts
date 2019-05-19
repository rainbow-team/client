import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {



  showNavMenu = true;
  navMenuWidth = 200;

  navMenu: NavMenu = [
    {
      name: '首页', id: 'home', route: 'index/home'
    },
    {
      name: '监管信息', id: 'supersivion',
      children:[
        {
          name: '核安全监管员信息', id: 'supervisor', route: 'index/supervisor'
        }
      ]
    },
    { name: '营运单位及设施', id: 'yydwjss', route: '' },
    { name: '核安全许可', id: 'haqxk', route: '' },
    { name: '核安全审评', id: 'haqps', route: '' },
    { name: '核安全监督', id: 'haqjd', route: '' },
    { name: '安全信息', id: 'aqxx', route: '' },
    { name: '统计分析', id: 'tjfx', route: '' },
    { name: '系统设置', id: 'xtsz', route: '' }
  ];

  constructor() { }

  ngOnInit() {






  }

}

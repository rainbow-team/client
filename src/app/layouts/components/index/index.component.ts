import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { LayoutChangeService } from '../../services/layout-change.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //当前位置面包屑
  private breadcrumbList: any = [];
  isIndex: any = true;

  constructor(private layoutChangeService: LayoutChangeService) { }

  ngOnInit() {
    this.layoutChangeService.routeChange.subscribe((data: any) => {
      if (data[0] == "首页") {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }


      this.breadcrumbList = data;
    })
  }



}

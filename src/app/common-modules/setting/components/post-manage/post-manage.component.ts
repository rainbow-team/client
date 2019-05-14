import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutChangeService } from './../../../../layouts/services/layout-change.service';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.scss']
})
export class PostManageComponent implements OnInit, OnDestroy {

  dataSet = [];

  showDetail = false;

  fixedHeight = 290;
  nzTableScroll: any = {};
  subWinResize: Subscription;

  constructor(private layoutService: LayoutChangeService) { }

  ngOnInit() {
    this.nzTableScroll.y = this.layoutService.getScrollHeight(this.fixedHeight) + 'px';
    this.subWinResize = this.layoutService.subWinResize.asObservable()
      .subscribe(() => {
        this.nzTableScroll.y = this.layoutService.getScrollHeight(this.fixedHeight) + 'px';
      });
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }

  showPostInfo(data?) {
    this.showDetail = true;
  }

  deletePost(data) {

  }

  ngOnDestroy() {
    if (this.subWinResize) {
      this.subWinResize.unsubscribe();
    }
  }
}

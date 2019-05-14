import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { LayoutChangeService } from './layouts/services/layout-change.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Client';
  subOnResize: Subscription;

  constructor(private layoutService: LayoutChangeService) {

  }

  ngOnInit() {
    this.subOnResize = fromEvent(window, 'resize')
      .subscribe(() => {
        this.layoutService.notifyWinResize();
      });
  }

  ngOnDestroy() {
    if (this.subOnResize) {
      this.subOnResize.unsubscribe();
    }
  }
}

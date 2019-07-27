import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {


  reportId: any = "fac-report";

  constructor() { }

  ngOnInit() {

  }

  click(param) {
    this.reportId = param;
  }
}
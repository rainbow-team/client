import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nesting-setting',
  templateUrl: './nesting-setting.component.html',
  styleUrls: ['./nesting-setting.component.scss']
})
export class NestingSettingComponent implements OnInit {

  thcdRatio = 0;
  switchValue = false;

  constructor() { }

  ngOnInit() {
  }

  tipFormatter(value) {
    return `${value}%`;
  }
}

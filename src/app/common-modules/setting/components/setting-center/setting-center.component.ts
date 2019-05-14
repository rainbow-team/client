import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-center',
  templateUrl: './setting-center.component.html',
  styleUrls: ['./setting-center.component.scss']
})
export class SettingCenterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}

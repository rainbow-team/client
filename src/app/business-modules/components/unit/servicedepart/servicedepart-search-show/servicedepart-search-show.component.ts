import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicedepart-search-show',
  templateUrl: './servicedepart-search-show.component.html',
  styleUrls: ['./servicedepart-search-show.component.scss']
})
export class ServicedepartSearchShowComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery']);
  }

}

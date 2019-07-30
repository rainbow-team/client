import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicedepart-search-show',
  templateUrl: './servicedepart-search-show.component.html',
  styleUrls: ['./servicedepart-search-show.component.scss']
})
export class ServicedepartSearchShowComponent implements OnInit {

  servicedepartId: any;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.servicedepartId = this.ActivatedRoute.snapshot.queryParams["id"];
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery']);
  }

}

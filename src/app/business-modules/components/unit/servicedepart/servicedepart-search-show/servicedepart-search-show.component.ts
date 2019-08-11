import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicedepart-search-show',
  templateUrl: './servicedepart-search-show.component.html',
  styleUrls: ['./servicedepart-search-show.component.scss']
})
export class ServicedepartSearchShowComponent implements OnInit {

  servicedepartId: any;
  idx: any = 0;
  constructor(private router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.servicedepartId = this.ActivatedRoute.snapshot.queryParams["id"];
    let idx = this.ActivatedRoute.snapshot.queryParams["idx"];

    if (idx) {
      this.idx = idx;
    }
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'], { queryParams: { type: 1 } });
  }

}

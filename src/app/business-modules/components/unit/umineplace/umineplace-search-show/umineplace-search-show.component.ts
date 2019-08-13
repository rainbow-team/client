import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-umineplace-search-show',
  templateUrl: './umineplace-search-show.component.html',
  styleUrls: ['./umineplace-search-show.component.scss']
})
export class UmineplaceSearchShowComponent implements OnInit {

  umineplaceId: any;
  idx: any = 0;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.umineplaceId = this.ActivatedRoute.snapshot.queryParams["id"];
    let idx = this.ActivatedRoute.snapshot.queryParams["idx"];

    if (idx) {
      this.idx = idx;
    }
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 5 } });
  }

}

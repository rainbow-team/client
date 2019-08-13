import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fac-search-show',
  templateUrl: './fac-search-show.component.html',
  styleUrls: ['./fac-search-show.component.scss']
})
export class FacSearchShowComponent implements OnInit {

  facId: any;
  idx: any = 0;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.facId = this.ActivatedRoute.snapshot.queryParams["id"];
    let idx = this.ActivatedRoute.snapshot.queryParams["idx"];

    if (idx) {
      this.idx = idx;
    }
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 4 } });
  }
}

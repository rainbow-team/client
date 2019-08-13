import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uminemountain-search-show',
  templateUrl: './uminemountain-search-show.component.html',
  styleUrls: ['./uminemountain-search-show.component.scss']
})
export class UminemountainSearchShowComponent implements OnInit {

  uminemountainId: any;
  idx: any = 0;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.uminemountainId = this.ActivatedRoute.snapshot.queryParams["id"];
    let idx = this.ActivatedRoute.snapshot.queryParams["idx"];

    if (idx) {
      this.idx = idx;
    }
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 6 } });
  }

}

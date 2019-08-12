import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-umine-search-show',
  templateUrl: './umine-search-show.component.html',
  styleUrls: ['./umine-search-show.component.scss']
})
export class UmineSearchShowComponent implements OnInit {

  umineId: any;

  idx: any = 0;

  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.umineId = this.ActivatedRoute.snapshot.queryParams["id"];
    let idx = this.ActivatedRoute.snapshot.queryParams["idx"];

    if (idx) {
      this.idx = idx;
    }
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 2 } });
  }
}

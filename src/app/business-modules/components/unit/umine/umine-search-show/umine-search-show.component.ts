import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-umine-search-show',
  templateUrl: './umine-search-show.component.html',
  styleUrls: ['./umine-search-show.component.scss']
})
export class UmineSearchShowComponent implements OnInit {

  umineId: any;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.umineId = this.ActivatedRoute.snapshot.queryParams["id"];
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 2 } });
  }
}

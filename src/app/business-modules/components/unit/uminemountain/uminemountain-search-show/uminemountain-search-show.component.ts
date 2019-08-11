import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uminemountain-search-show',
  templateUrl: './uminemountain-search-show.component.html',
  styleUrls: ['./uminemountain-search-show.component.scss']
})
export class UminemountainSearchShowComponent implements OnInit {

  uminemountainId: any;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.uminemountainId = this.ActivatedRoute.snapshot.queryParams["id"];
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 6 } });
  }

}

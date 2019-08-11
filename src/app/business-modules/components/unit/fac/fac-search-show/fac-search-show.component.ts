import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fac-search-show',
  templateUrl: './fac-search-show.component.html',
  styleUrls: ['./fac-search-show.component.scss']
})
export class FacSearchShowComponent implements OnInit {

  facId: any;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.facId = this.ActivatedRoute.snapshot.queryParams["id"];
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 4 } });
  }
}

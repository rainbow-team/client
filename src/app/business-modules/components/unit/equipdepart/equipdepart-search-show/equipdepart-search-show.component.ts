import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipdepart-search-show',
  templateUrl: './equipdepart-search-show.component.html',
  styleUrls: ['./equipdepart-search-show.component.scss']
})
export class EquipdepartSearchShowComponent implements OnInit {

  equipdepartId: any;
  constructor(private router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.equipdepartId = this.ActivatedRoute.snapshot.queryParams["id"];
  }

  close() {
    this.router.navigate(['/searchShow/integratedAuery'],{ queryParams: { type: 3 } });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-childmanage',
  templateUrl: './supervisor-childmanage.component.html',
  styleUrls: ['./supervisor-childmanage.component.scss']
})
export class SupervisorChildmanageComponent implements OnInit {


  dataSet: any = [
    {
      key: 1,
      key1: '20180601001',
      key2: '2019 - 01 - 01',
      key3: 'A',
      key4: '420001',
      key5: '2019 - 02 - 01',
      key6: '2020 - 01 - 01'

    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {

  }

  close() {
    this.router.navigate(['/index/supersivion/supervisor'], { queryParams: { sid: 1 } });
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integrated-auery',
  templateUrl: './integrated-auery.component.html',
  styleUrls: ['./integrated-auery.component.scss']
})
export class IntegratedAueryComponent implements OnInit {

  menuItems: any = [
    { name: "集团" }, { name: "核设施营运单位" }, { name: "铀矿冶单位" }, { name: "核设备单位" }, { name: "核设施" }, { name: "铀尾矿（渣）库" },
    { name: "铀矿山" }
  ]

  selectMenuName = "核设施营运单位";
  constructor() { }

  ngOnInit() {
  }

  clickMenu(item) {
    this.selectMenuName = item.name;
  }

}

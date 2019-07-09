import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { LayoutChangeService } from './../layouts/services/layout-change.service';
import { DictionarySercice } from './../services/common/dictionary.service';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './business-modules.component.html',
    styleUrls: ['./business-modules.component.scss']
})
export class BusinessModulesComponent implements OnInit {

    //当前位置面包屑
    private breadcrumbList: any = [];
    isIndex: any = true;

    constructor(private layoutChangeService: LayoutChangeService, private dictionarySercice: DictionarySercice,
        private staffSercice: StaffSercice,private router: Router) { }

    ngOnInit() {

        let logUser= this.staffSercice.getStaffObj();
        if (!logUser) {
            this.router.navigate(['/login'])
        }
        //初始化字典
        this.dictionarySercice.getAllConfig(true);

        this.layoutChangeService.routeChange.subscribe((data: any) => {
            if (data[0] == "首页") {
                this.isIndex = true;
            } else {
                this.isIndex = false;
            }


            this.breadcrumbList = data;
        });
    }



}

import { Component, OnInit } from '@angular/core';
import { HaqjdyService } from '../../../share/services/haqjdy/haqjdy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-haqjdy',
    templateUrl: './haqjdy.component.html',
    styleUrls: ['./haqjdy.component.scss']
})
export class HaqjdyComponent implements OnInit {

    public dataSet: any;
    public data = {};
    public selectData: any = {};
    public name: any = "";
    public selectedIndex: any = 0;
    constructor(private haqjdyService: HaqjdyService) { }

    ngOnInit() {

        this.select();
    }

    Submit() {
        var that =this;
        this.haqjdyService.saveOrUpdateSupervisionSupervisor(this.data).subscribe(
            (res) => {
                that.selectedIndex = 0;
                that.select();
            }
        );
    }

    clickList(data) {
        this.selectData = data;
    }

    update() {
        var that =this;
        this.haqjdyService.getSupervisionSupervisorById(this.selectData.id).subscribe(
            (res) => {
                that.selectedIndex = 1;
                that.data = res.msg;
            }
        );
    }

    add() {
        this.selectedIndex = 1;
        this.data = {};
    }

    delete() {
        this.haqjdyService.deleteSupervisionSupervisorById(this.selectData.id).subscribe(
            (res) => {
                this.select();
            }
        );
    }

    select() {
        var option = {
            name: this.name ? this.name : ""
        }
        this.haqjdyService.getSupervisionSupervisorList(option).subscribe(
            (data) => {
                let res = data;
                this.dataSet = res.msg;
                if (this.dataSet != null && this.dataSet.length > 0) {
                    this.selectData = this.dataSet[0];
                }
            }
        );
    }




}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { FacSecuritySercice } from 'src/app/services/security/fac.service';
import { StatisticsSercice } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-security-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.scss']
})
export class SecurityFacComponent implements OnInit {

  @Input() servicedepartId: any = "";
  
  dictionary: any = {};
  staffObj: any = {};

  pageIndex: any = 1;
  totalCount: any;
  pageSize: any = 10;

  dataSet: any = [];

  serviceDepartName: any = "";

  facName:any="";

  facStatusTypeIds:any=[];

  checkTypeIds:any=[];

  content:any="";
  
  find_date:any=[];

  questionTypeIds:any=[];

  questionNatureIds:any=[];

  reformStatusTypeIds:any=[];

  condition={
    tableName:'unit_fac',
    propertyName:'build_year',
    configTableName:'config_fac_supervison_category'
  }

  data:any=[];

  constructor(private router: Router,
    private msg: NzMessageService, private facSecuritySercice: FacSecuritySercice, private dictionarySercice: DictionarySercice,
    private staffSercice: StaffSercice, private serviceDepartService: ServiceDepartService, 
    private facSercice: FacSercice,private statisticsSercice:StatisticsSercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();
    this.staffObj = this.staffSercice.getStaffObj();

    this.search();

  }

  search() {
    var option = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      conditions: []
      
    }

    if (this.serviceDepartName) {
      option.conditions.push({ key: "serviceDepartName", value: this.serviceDepartName })
    }

    if (this.facName) {
      option.conditions.push({ key: "facName", value: this.facName })
    }

    if (this.facStatusTypeIds.length > 0) {
      option.conditions.push({ key: "facStatusTypeIds", value: this.facStatusTypeIds })
    }

    if (this.checkTypeIds.length > 0) {
      option.conditions.push({ key: "checkTypeIds", value: this.checkTypeIds })
    }

    if (this.content) {
      option.conditions.push({ key: "content", value: this.content })
    }

    if (this.find_date && this.find_date.length > 0) {
      if (this.find_date[0]) {
        option.conditions.push({ key: "start_date", value: this.find_date[0] })
      }

      if (this.find_date[1]) {
        option.conditions.push({ key: "end_date", value: this.find_date[1] })
      }
    }

    if (this.questionTypeIds.length > 0) {
      option.conditions.push({ key: "questionTypeIds", value: this.questionTypeIds })
    }

    if (this.questionNatureIds.length > 0) {
      option.conditions.push({ key: "questionNatureIds", value: this.questionNatureIds })
    }

    if (this.reformStatusTypeIds.length > 0) {
      option.conditions.push({ key: "reformStatusTypeIds", value: this.reformStatusTypeIds })
    }

    if (this.servicedepartId) {
      option.conditions.push({
        key: 'servicedepartId',
        value: this.servicedepartId
      });
    }


    this.facSecuritySercice.getFacSecurityList(option).subscribe(
      (data) => {
        this.dataSet = data.msg.currentList;
        this.totalCount = data.msg.recordCount;
      }
    );
  }

  reset() {
    this.serviceDepartName= "";
    this.facName="";
    this.facStatusTypeIds=[];
    this.checkTypeIds=[];
    this.content="";
    this.find_date=[];
    this.questionTypeIds=[];
    this.questionNatureIds=[];
    this.reformStatusTypeIds=[];

    this.statisticsSercice.getStatisticsResultByYear(this.condition).subscribe((res)=>{

      this.data=res.msg;
    });
  }

  add() {
    this.router.navigate(['/security/fac/add']);
  }

  show(item, flag) {
    this.router.navigate(['/security/fac/add'], { queryParams: { id: item.id, flag: flag } });
  }

  delete(item) {

    this.facSecuritySercice.deleteFacSecurityById(item.id).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create("success", "删除成功");
        this.search();
      } else {
        this.msg.create("error", "删除失败");
      }
    })

  }
}

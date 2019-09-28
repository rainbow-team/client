import { Component, OnInit } from '@angular/core';
import { UnitAddressService } from 'src/app/services/unit/unitaddress.service';
import { ServiceDepartService } from 'src/app/services/unit/servicedepart.service';
import { UmineService } from 'src/app/services/unit/umine.service';
import { UnithotregionService } from 'src/app/services/unit/unithotregion.service';
import { FacSercice } from 'src/app/services/unit/fac.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UminePlaceService } from 'src/app/services/unit/umineplace.service';

@Component({
  selector: 'app-unit-show',
  templateUrl: './unit-show.component.html',
  styleUrls: ['./unit-show.component.scss']
})
export class UnitShowComponent implements OnInit {
  selectedUnit: any = {};
  unit_regions: any = [];
  isSubjectVisible = false;
  selectedRegion: any = {};
  subjectTitle = '';
  // markerType = '';
  selectedSubject: any = {};
  unitAddress: any = {};
  unitImageUrl = '';
  subjectImageUrl = '';
  province = '';

  disabled = false;
  constructor(
    private router: Router,
    private unitAddressService: UnitAddressService,
    private serviceDepartService: ServiceDepartService,
    private umineService: UmineService,
    private facSercice: FacSercice,
    private uminePlaceService: UminePlaceService,
    private unithotregionService: UnithotregionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.queryParams['id'];
    this.province = this.activatedRoute.snapshot.queryParams['province'];
    this.unitAddressService.getUnitAddressById(id).subscribe(res => {
      this.unitAddress = res.msg;
      this.showUnitDetail(this.unitAddress.unitType, this.unitAddress.unitId);
      this.unitImageUrl =
        AppConfig.serviceAddress + '/fileInfo/download?id=' + res.msg.picId;
    });
  }

  showUnitDetail(unitType: any, unitId: any) {
    if (unitType === '0') {
      //营运单位
      this.serviceDepartService.getServiceDepartById(unitId).subscribe(res => {
        this.selectedUnit = res.msg;
      });
    }
    if (unitType === '1') {
      this.umineService.getUmineById(unitId).subscribe(res => {
        this.selectedUnit = res.msg;
      });
    }

    this.unithotregionService
      .getUnitHotRegionListByUnitId(unitId)
      .subscribe(res => {
        this.unit_regions = res.msg;
      });
  }

  showSubjectDetail(item) {
    this.isSubjectVisible = true;
    this.selectedRegion = item;
    if (!this.selectedRegion.previewUrl) {
      this.disabled = true;
    }
    this.subjectImageUrl =
      AppConfig.serviceAddress + '/fileInfo/download?id=' + item.picId;
    if (this.unitAddress.unitType === '0') {
      this.subjectTitle = '核设施详细信息';
      this.facSercice.getFacById(item.subjectId).subscribe(res => {
        this.selectedSubject = res.msg;
      });
    }
    if (this.unitAddress.unitType === '1') {
      this.subjectTitle = '铀尾矿（渣）库详细信息';
      this.uminePlaceService
        .getUminePlaceById(item.subjectId)
        .subscribe(res => {
          this.selectedSubject = res.msg;
        });
    }
  }
  unitShowCancel() {
    this.isSubjectVisible = false;
  }

  unitShowOK() {
    this.isSubjectVisible = false;
  }
  back() {
    this.router.navigate(['/searchShow/simulation'], {
      queryParams: { id: this.province }
    });
  }
}

import { Component, OnInit, QueryList, ViewChildren, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NavMenu } from 'src/app/utilities/entities/navMenu';
import { StaffSercice } from 'src/app/services/common/staff-service';
import { SystemService } from 'src/app/services/system/system.service';
import { NgModel } from '@angular/forms';
import { UserService } from 'src/app/services/system/user.service';
import { ValidationDirective } from '../../_directives/validation.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  @Input()
  navMenu: NavMenu = [];

  name: any = '';
  isVisible: boolean;
  isOkLoading: boolean;
  currentUser: any = {};
  message: any = '';

  constructor(
    private router: Router,
    // private ngModel: NgModel,
    private modal: NzModalService,
    private msg: NzMessageService,
    private staffSercice: StaffSercice,
    private userService: UserService,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.name = this.staffSercice.getStaffObj().username;
    // this.ngModel.valueChanges.subscribe(v => {
    //   this.message = '';
    // });
  }
  changePassword() {
    this.currentUser = {};
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    if (!this.FormValidation()) {
      return;
    }

    let user = this.staffSercice.getStaffObj();
    if (this.currentUser.passwordNew !== this.currentUser.passwordCofirm) {
      // this.message = '两次输入的密码不一致，请确认后重新输入。';
      this.msg.create('error', '两次输入的密码不一致，请确认后重新输入。');
      return;
    }
    if (user.password !== this.currentUser.password) {
      this.msg.create('error', '原密码输入错误。');

      // this.message = '原密码输入错误。';
      return;
    }
    this.isOkLoading = true;
    let systemUser: any = {};
    systemUser.id = user.id;
    systemUser.password = this.currentUser.passwordNew;
    this.userService.changePassword(systemUser).subscribe(res => {
      this.isOkLoading = false;
      this.isVisible = false;
      if (res.code === 200) {
        this.msg.create('success', '密码修改成功');
        this.modal.info({
          nzTitle: '<i>提示</i>',
          nzContent: '<b>密码修改成功，请重新登录系统。</b>',
          nzOnOk: () => this.loginOut()
        });
      } else {
        this.msg.create('error', '密码修改失败');
      }
    });
    this.isOkLoading = false;
  }
  FormValidation() {
    let isValid = true;
    this.directives.forEach(d => {
      if (!d.validationValue()) {
        isValid = false;
      }
    });
    return isValid;
  }
  exitSystem() {
    this.modal.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定退出系统？</b>',
      nzOnOk: () => this.loginOut()
    });
  }

  loginOut() {
    this.systemService.loginout().subscribe(res => {
      sessionStorage.removeItem('staffObj');
      sessionStorage.removeItem('permission');

      this.router.navigate(['/login']);
    });
  }

  help() {

    window.open("src/assets/file/" + AppConfig.helpFileName);
  }
}

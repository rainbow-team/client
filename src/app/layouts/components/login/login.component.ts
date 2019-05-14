import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from '../../../common-modules/share/services/system/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isBusy = false;
  loginMessage = '';

  formData = {
    userName: '111',
    password: '111',
    remeberMe: false
  };

  constructor(private router: Router,
    private systemService: SystemService) { }

  ngOnInit() {
  }

  login(loginForm: NgForm): void {
    this.isBusy = true;
    if (loginForm.valid) {

      // 接口调用示例
      this.systemService.login({
        account: 'YWRtaW4=',
        password: 'ODg4',
        endpoint: 'client'
      }).subscribe((data) => {
        this.isBusy = false;
        this.router.navigate(['/setting']);
      }, 
      error => {
        this.isBusy = false;
        this.loginMessage = error.message;
      });

      // const errorMsg = '';
      // if (errorMsg) {
      //   this.loginMessage = '登录失败';
      //   this.isBusy = false;
      //   const closeTimeout = setTimeout(() => {
      //     this.closeMessage();
      //     clearTimeout(closeTimeout);
      //   }, 3000);
      // } else {
      //   setTimeout(() => {
      //     this.isBusy = false;
      //     this.router.navigate(['/setting']);
      //     // this.router.navigate(['/index']);
      //   }, 3000);  // sdfsdf 
      // }
    }
  }

  closeMessage() {
    this.loginMessage = '';
  }
}

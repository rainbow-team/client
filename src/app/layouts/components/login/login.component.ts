import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from '../../../services/system/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogining = false;

  loginMessage = '';
  username = "";
  password = "";
  code = "";


  getVerifyCode = AppConfig.serviceAddress + "/getVerifyCode?" + new Date().getTime();

  constructor(private router: Router,
    private systemService: SystemService) { }

  ngOnInit() {
  }

  login(): void {

    this.loginMessage = "";

    if (!this.username) {
      this.loginMessage = "用户名不能为空"
      return;
    }

    if (!this.password) {
      this.loginMessage = "密码不能为空"
      return;
    }

    if (!this.code) {
      this.loginMessage = "验证吗不能为空"
      return;
    }


    this.isLogining = true;
    // 接口调用示例
    this.systemService.login({
      username: this.username,
      password: this.password,
      code: this.code
    }).subscribe((data) => {

      this.isLogining = false;

      if (data.code == 200) {
        this.router.navigate(['/index']);
      } else {
        this.loginMessage = data.msg;
      }

    },
      error => {
        this.isLogining = false;
        this.loginMessage = error.message;
      });

  }

  changeVerifyCode() {
    this.getVerifyCode = AppConfig.serviceAddress + "/getVerifyCode?" + new Date().getTime();
  }

}

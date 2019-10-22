import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from '../../../services/system/system.service';
import { CookieService } from 'ngx-cookie-service';
import { StaffSercice } from '../../../services/common/staff-service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogining = false;

  loginMessage = '';
  username = '';
  password = '';
  code = '';

  title = '';
  copyright = '';
  support = '';

  image: any;
  canvas: any;
  rand: any;

  getVerifyCode =
    AppConfig.serviceAddress + '/getVerifyCode?' + new Date().getTime();

  nums = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  colors = [];

  constructor(
    private router: Router,
    private systemService: SystemService,
    private cookieService: CookieService,
    private staffSercice: StaffSercice
  ) {}

  ngOnInit() {
    this.copyright = AppConfig.copyright;
    this.support = AppConfig.support;
    this.title = AppConfig.systemTitle;

    var that = this;
    setTimeout(() => {
      that.drawCode();

      document.getElementById('code_img').onclick = function() {
        $('#verifyCanvas').remove();
        $('#verify').after(
          '<canvas width="100" height="40" id="verifyCanvas"></canvas>'
        );
        that.drawCode();
      };
    }, 100);

    $(document).keypress(function(e) {
      var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
      //eCode等于13代表回车事件
      if (eCode == 13) {
        that.login();
      }
    });
  }

  drawCode() {
    this.canvas = document.getElementById('verifyCanvas'); //获取HTML端画布
    var context = this.canvas.getContext('2d'); //获取画布2D上下文
    context.fillStyle = 'cornflowerblue'; //画布填充色
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // 创建渐变
    var gradient = context.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');
    //清空画布
    context.fillStyle = gradient; //设置字体颜色
    context.font = '25px Arial'; //设置字体
    this.rand = new Array();
    var x = new Array();
    var y = new Array();
    for (var i = 0; i < 4; i++) {
      this.rand[i] = this.nums[Math.floor(Math.random() * this.nums.length)];
      x[i] = i * 16 + 10;
      y[i] = Math.random() * 20 + 20;
      context.fillText(this.rand[i], x[i], y[i]);
    }

    //画3条随机线
    for (var i = 0; i < 3; i++) {
      this.drawline(this.canvas, context);
    }

    // 画30个随机点
    for (var i = 0; i < 30; i++) {
      this.drawDot(this.canvas, context);
    }
    this.convertCanvasToImage(this.canvas);
  }

  // 随机线
  drawline(canvas, context) {
    context.moveTo(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height)
    ); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
    context.lineTo(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height)
    ); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
    context.lineWidth = 0.5; //随机线宽
    context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
    context.stroke(); //描边，即起点描到终点
  }
  // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
  drawDot(canvas, context) {
    var px = Math.floor(Math.random() * canvas.width);
    var py = Math.floor(Math.random() * canvas.height);
    context.moveTo(px, py);
    context.lineTo(px + 1, py + 1);
    context.lineWidth = 0.2;
    context.stroke();
  }
  // 绘制图片
  convertCanvasToImage(canvas) {
    document.getElementById('verifyCanvas').style.display = 'none';
    this.image = document.getElementById('code_img');
    this.image.src = canvas.toDataURL('image/png');
    return this.image;
  }

  login(): void {
    this.loginMessage = '';

    if (!this.username) {
      this.loginMessage = '用户名不能为空';
      return;
    }

    if (!this.password) {
      this.loginMessage = '密码不能为空';
      return;
    }

    if (!this.code) {
      this.loginMessage = '验证码不能为空';
      return;
    }

    // let idyCode = this.cookieService.get("_code");
    var newRand = this.rand.join('');
    if (newRand.toLocaleLowerCase() != this.code.toLocaleLowerCase()) {
      this.loginMessage = '验证码不正确';
      return;
    }

    this.isLogining = true;
    // 接口调用示例
    this.systemService
      .login({
        username: this.username,
        password: this.password,
        code: this.code
      })
      .subscribe(
        data => {
          this.isLogining = false;

          if (data.code == 200) {
            this.staffSercice.setStaffObj(data.msg);

            sessionStorage.setItem(
              'permission',
              JSON.stringify(data.msg.permission)
            );

            sessionStorage.setItem('AUTH_ID', data.msg.ticket);

            this.router.navigate(['/home']);
          } else {
            this.loginMessage = data.msg;
          }
        },
        error => {
          this.isLogining = false;
          this.loginMessage = error.message;
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-add',
  templateUrl: './supervisor-add.component.html',
  styleUrls: ['./supervisor-add.component.scss']
})
export class SupervisorAddComponent implements OnInit {

  data: any = {};

  fileList = [
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ];
  previewImage = '';
  previewVisible = false;

  constructor(private msg: NzMessageService,private router: Router) {}

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  ngOnInit() {
  }

  close(){
    this.router.navigate(['/index/supersivion/supervisor'], { queryParams: { sid: 1 } });
  }

}

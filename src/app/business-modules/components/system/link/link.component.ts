import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SettingService } from 'src/app/services/system/setting.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;

  dataSet: any = [];
  editCache = {};
  isVisible: any = false;
  linkdata: any = {};
  dictionary: any = [];
  selectId: any = "";

  constructor(private settingService: SettingService, private msg: NzMessageService) { }

  ngOnInit() {
    this.searchLink();
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {

    const index = this.dataSet.findIndex(item => item.id === key);
    this.settingService.deleteLinkDetailById(this.dataSet[index].id).subscribe((res) => {
      if (res.code == 200) {
        this.msg.create('success', '删除成功');
        this.searchLink();
      } else {
        this.msg.create('error', '删除失败');
      }

    })


    this.editCache[key].edit = false;
  }

  saveEdit(key: string): void {

    if (!this.editCache[key].data.name || !this.editCache[key].data.address || !this.editCache[key].data.linkorder) {

      this.msg.create('warning', '链接名称,链接地址,排序都不能为空');
      return;
    }

    if(!(/^\d+$/.test(this.editCache[key].data.linkorder))){
      this.msg.create('warning', '排序必须为数值');
      return;
    }

    const index = this.dataSet.findIndex(item => item.id === key);
    Object.assign(this.dataSet[index], this.editCache[key].data);

    this.settingService.modifyLink(this.dataSet[index]).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create('success', '编辑成功');
      } else {
        this.msg.create('error', '编辑失败');
      }
    })

    this.editCache[key].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  searchLink() {
    this.settingService.getAllLinkList().subscribe((res) => {
      this.dataSet = res.msg;
      this.updateEditCache();
    })
  }

  addlink() {
    this.linkdata = {};
    this.isVisible = true;
  }

  handleOk() {

    if (!this.FormValidation()) {
      return;
    }

    this.settingService.addLink(this.linkdata).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create('success', '新增成功');
        this.isVisible = false;
        this.searchLink();
      } else {
        this.msg.create('error', '新增失败');
      }
    })
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
}

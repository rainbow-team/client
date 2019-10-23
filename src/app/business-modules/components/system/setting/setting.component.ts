import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SettingService } from 'src/app/services/system/setting.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ValidationDirective } from 'src/app/layouts/_directives/validation.directive';
import { DictionarySercice } from 'src/app/services/common/dictionary.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  @ViewChildren(ValidationDirective) directives: QueryList<ValidationDirective>;


  dataSet: any = [];
  editCache = {};
  isVisible: any = false;
  linkdata: any = {};
  dictionary: any = [];
  selectId: any = "";

  isDicVisible: any = false;

  searchText: any = "";

  configList: any = [
    { Name: "事故事件性质", TableName: "config_accident_nature" },
    { Name: "事故事件类别", TableName: "config_accident_type" },
    { Name: "核活动及其他审评信息文件类型", TableName: "config_activity_check_file_type" },
    { Name: "核活动类型", TableName: "config_activity_type" },
    { Name: "无损检验等级", TableName: "config_check_level" },
    { Name: "无损检验方法", TableName: "config_check_method" },
    { Name: "学位", TableName: "config_degree" },
    { Name: "单位类型", TableName: "config_depart_type" },
    { Name: "学历", TableName: "config_education" },
    { Name: "核安全设备评审阶段", TableName: "config_equip_check_stage" },
    { Name: "设备核安全级别", TableName: "config_equip_level" },
    { Name: "核安全设备许可阶段", TableName: "config_equip_permit_stage" },
    { Name: "设备安全问题类别", TableName: "config_equip_security_question_type" },
    { Name: "核安全设备类别", TableName: "config_equip_type" },
    { Name: "设施/设备/铀尾矿(渣)库审评文件类型", TableName: "config_fac_check_file_type" },
    { Name: "核设施审评阶段表", TableName: "config_fac_check_stage" },
    { Name: "核设施审评类型表", TableName: "config_fac_check_type" },
    { Name: "核设施的许可情况", TableName: "config_fac_permit_situation" },
    { Name: "核设施许可阶段", TableName: "config_fac_permit_stage" },
    { Name: "核设施定期报告类型", TableName: "config_fac_report_type" },
    { Name: "核设施安全问题性质", TableName: "config_fac_security_question_nature" },
    { Name: "核设施安全问题类型", TableName: "config_fac_security_question_type" },
    { Name: "核设施状态", TableName: "config_fac_status" },
    { Name: "核设施监管类别", TableName: "config_fac_supervison_category" },
    { Name: "核设施类型", TableName: "config_fac_type" },
    { Name: "监督检查文件类型", TableName: "config_monitor_check_file_type" },
    { Name: "监督检查类型表", TableName: "config_monitor_check_type" },
    { Name: "日常监督文件类型", TableName: "config_monitor_daily_file_type" },
    { Name: "监督报告类型", TableName: "config_monitor_report_type" },
    { Name: "研究堆操纵员执照种类", TableName: "config_operator_license_type" },
    { Name: "政治面貌", TableName: "config_political" },
    { Name: "审评状态", TableName: "config_review_status" },
    { Name: "安全问题检查类型", TableName: "config_security_check_type" },
    { Name: "安全问题整改状态", TableName: "config_security_reform_status" },
    { Name: "授权监管机构单位性质", TableName: "config_supervision_org_nature" },
    { Name: "核安全监督员类别", TableName: "config_supervisor_type" },
    { Name: "职称", TableName: "config_title" },
    { Name: "井下消防验收情况", TableName: "config_umine_mountain_accept" },
    { Name: "铀矿山井下消防审查文件类型", TableName: "config_umine_mountain_check_file_type" },
    { Name: "井下消防审查备案情况", TableName: "config_umine_mountain_record" },
    { Name: "铀矿山设施状态", TableName: "config_umine_mountain_status" },
    { Name: "铀尾矿(渣)库审评阶段", TableName: "config_umine_place_check_stage" },
    { Name: "铀尾矿(渣)库审评类型", TableName: "config_umine_place_check_type" },
    { Name: "铀尾矿(渣)库等别", TableName: "config_umine_place_level" },
    { Name: "铀尾矿（渣）库许可情况", TableName: "config_umine_place_permit_situation" },
    { Name: "铀尾矿(渣)库许可阶段", TableName: "config_umine_place_permit_stage" },
    { Name: "铀尾矿(渣)库安全问题性质", TableName: "config_umine_place_security_question_nature" },
    { Name: "铀尾矿(渣)库安全问题类别表", TableName: "config_umine_place_security_question_type" },
    { Name: "铀尾矿(渣) 库设施状态", TableName: "config_umine_place_status" }
  ];

  configListCopy: any = [];

  dicItems: any = [

  ];
  dicdata: any = {};

  selectConfigItem: any;

  constructor(private settingService: SettingService, private msg: NzMessageService, private dictionarySercice: DictionarySercice) { }

  ngOnInit() {

    this.dictionary = this.dictionarySercice.getAllConfig();

    this.configList.sort((a, b) => a.Name.localeCompare(b.Name, 'zh-Hans-CN', { sensitivity: 'accent' }))

    this.searchLink();
    this.selectConfigItem = this.configList[0];

    this.configListCopy = JSON.parse(JSON.stringify(this.configList));
    this.getDicItemsByTableName();
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  searchDic() {

    var that = this;

    if (that.searchText) {
      that.configList=that.configList.filter(function (params) {

        return params.Name.indexOf(that.searchText) != -1;
      });

      if (that.configList.length > 0) {
        that.selectConfigItem = that.configList[0];
        that.getDicItemsByTableName();
      }

    } else {
      that.configList = JSON.parse(JSON.stringify(that.configListCopy));
      that.selectConfigItem = that.configList[0];
      that.getDicItemsByTableName();

    }
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

    if (!(/^\d+$/.test(this.editCache[key].data.linkorder))) {
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



  clickConfigItem(item) {
    this.selectConfigItem = item;
    this.getDicItemsByTableName();
  }

  selectItem(data) {
    this.selectId = data.id;
  }

  //根据表名获取信息
  getDicItemsByTableName() {

    this.dictionarySercice.getDicItemsByTableName(this.selectConfigItem.TableName).subscribe((res) => {

      this.dicItems = res.msg;
    });
  }


  //添加字典项
  addDic() {
    this.isDicVisible = true;
    this.dicdata = {};
  }

  //编辑字典项
  edit(data) {
    this.isDicVisible = true;
    this.dicdata = JSON.parse(JSON.stringify(data));
  }

  handleDicOk() {

    if (!this.FormValidation()) {
      return;
    }

    this.dicdata.tableName = this.selectConfigItem.TableName;
    this.dictionarySercice.SaveOrUpdateConfig(this.dicdata).subscribe((res) => {

      if (res.code == 200) {
        this.msg.create('success', '保存成功');
        this.isDicVisible = false;
        this.getDicItemsByTableName();
      } else {
        this.msg.create('error', '保存失败');
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

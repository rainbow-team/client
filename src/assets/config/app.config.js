(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    //如果没有AMD/CMD和CommonJS就挂在全局对象下
    root.AppConfig = factory();
  }
})(this, function() {
  // 应用全局配置对象
  var AppConfig = {
    // 系统标题
    systemTitle: '核安全数据库',

    //版权
    copyright:
      '版权：Copyright©2019  国防科工局军用核设施核安全技术审评监督中心  All Rights Reserved',

    support: '技术支持： 核动力运行研究所',
    // WCF服务完整地址
    get serviceAddress() {
      return 'http://localhost:8080';
    },

    get clientAddress() {
      return 'http://localhost:4200';
    },

    get helpFileName() {
      return '帮助文档.zip';
    },

    // 附件配置节点
    get fileConfig() {
      var self = this;
      return {
        // 附件地址前缀
        addrPrefix: self.serviceAddress + '/fs/gl/',

        // 文件上传地址
        addrUpload: self.serviceAddress + '/filemgr/attachment/uploadTmpFile',

        // 附件上传允许的最大大小
        allowMaxSize: 2048
      };
    }
  };

  return AppConfig;
});

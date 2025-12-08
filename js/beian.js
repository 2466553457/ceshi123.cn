const RECORD_CONFIG = {
  // ICP备案号
  icp: {
    number: "京ICP备12345678号",
    url: "https://beian.miit.gov.cn/",
    show: true,
    icon: "icon-icp",
  },

  // 公安网备案
  gongan: {
    number: "京公网安备 11010502030123号",
    url: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030123",
    show: true,
    icon: "icon-gongan",
  },

  // 网信办备案
  cyberspace: {
    number: "京网信备 202312345号",
    url: "https://beian.12377.cn/",
    show: true,
    icon: "icon-cyberspace",
  },

  // 显示选项
  options: {
    copyrightText: `© ${new Date().getFullYear()} 暗源网站 版权所有`,
    noticeText: "本站点严格遵守国家相关法律法规",
    showSeparator: true,
    separator: "|",
    openInNewTab: true,
    addRelAttribute: true,
    showIcons: true, // 是否显示图标
    responsiveBreakpoints: {
      mobile: 576, // 手机断点
      tablet: 768, // 平板断点
      desktop: 1024, // 桌面断点
    },
  },
};

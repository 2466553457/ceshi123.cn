document.addEventListener("DOMContentLoaded", function () {
  // 等待页面完全加载
  setTimeout(initRecordContainer, 100);

  // 监听窗口大小变化
  window.addEventListener("resize", debounce(updateLayout, 250));
});

function initRecordContainer() {
  const container = document.getElementById("record-container");
  if (!container) {
    console.warn("未找到备案容器元素 #record-container");
    return;
  }

  // 清空容器
  container.innerHTML = "";

  // 添加版权信息
  if (RECORD_CONFIG.options.copyrightText) {
    const copyright = document.createElement("div");
    copyright.className = "record-copyright";
    copyright.textContent = RECORD_CONFIG.options.copyrightText;
    container.appendChild(copyright);
  }

  // 创建链接容器
  const linksWrapper = document.createElement("div");
  linksWrapper.className = "record-links-wrapper";
  container.appendChild(linksWrapper);

  // 根据屏幕宽度确定布局方式
  updateLayout();

  // 添加说明文字
  if (RECORD_CONFIG.options.noticeText) {
    const notice = document.createElement("div");
    notice.className = "record-notice";
    notice.textContent = RECORD_CONFIG.options.noticeText;
    container.appendChild(notice);
  }
}

function updateLayout() {
  const container = document.getElementById("record-container");
  if (!container) return;

  const linksWrapper = container.querySelector(".record-links-wrapper");
  if (!linksWrapper) return;

  // 清空现有链接
  linksWrapper.innerHTML = "";

  // 获取当前屏幕宽度
  const screenWidth = window.innerWidth;
  const isMobile =
    screenWidth < RECORD_CONFIG.options.responsiveBreakpoints.mobile;

  // 收集需要显示的备案信息
  const records = [];
  if (RECORD_CONFIG.icp.show) records.push(RECORD_CONFIG.icp);
  if (RECORD_CONFIG.gongan.show) records.push(RECORD_CONFIG.gongan);
  if (RECORD_CONFIG.cyberspace.show) records.push(RECORD_CONFIG.cyberspace);

  // 创建链接元素
  records.forEach((record, index) => {
    // 添加分隔符（桌面端显示）
    if (index > 0 && !isMobile && RECORD_CONFIG.options.showSeparator) {
      const separator = document.createElement("span");
      separator.className = "record-separator";
      separator.textContent = RECORD_CONFIG.options.separator;
      linksWrapper.appendChild(separator);
    }

    // 创建链接
    const link = createRecordLink(record);
    linksWrapper.appendChild(link);

    // 移动端添加换行（如果需要）
    if (isMobile && index < records.length - 1) {
      linksWrapper.appendChild(document.createElement("br"));
    }
  });
}

function createRecordLink(record) {
  const link = document.createElement("a");
  link.href = record.url;
  link.className = "record-link";

  // 添加图标
  if (RECORD_CONFIG.options.showIcons && record.icon) {
    const icon = document.createElement("span");
    icon.className = `record-icon ${record.icon}`;
    link.appendChild(icon);
  }

  // 添加文本
  const text = document.createElement("span");
  text.className = "record-text";
  text.textContent = record.number;
  link.appendChild(text);

  // 设置链接属性
  if (RECORD_CONFIG.options.openInNewTab) {
    link.target = "_blank";
  }

  if (RECORD_CONFIG.options.addRelAttribute) {
    link.rel = "noopener noreferrer nofollow";
  }

  // 添加title提示
  if (record.icon === "icon-icp") {
    link.title = "工业和信息化部ICP备案";
  } else if (record.icon === "icon-gongan") {
    link.title = "公安部联网备案";
  } else if (record.icon === "icon-cyberspace") {
    link.title = "国家网信办互联网信息服务备案";
  }

  // 触摸设备优化
  link.setAttribute("role", "link");
  link.setAttribute("aria-label", `${record.number} 备案信息`);

  return link;
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 暴露配置接口
window.RecordConfig = {
  update: function (newConfig) {
    Object.assign(RECORD_CONFIG, newConfig);
    initRecordContainer();
  },
  get: function () {
    return JSON.parse(JSON.stringify(RECORD_CONFIG));
  },
};

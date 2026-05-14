import type { IDictionary } from "./types";

export const zh: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "iframe / sanitize 攻击场景集",
    description:
      "用于验证 DOMPurify 等 HTML 净化器对 iframe 嵌入的实际允许范围的 PoC 集合。可用于验证自有服务的净化策略、确认 sandbox 关键字效果，或作为安全培训资料。",
  },
  nav: {
    home: "首页",
    embedHelper: "Embed Helper",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "我是前端开发者 Sangmook Kim。在为公司服务实施 iframe 净化策略时，想直接验证不设主机白名单时实际存在哪些攻击面，因此搭建了本站。",
      "每个场景重现了嵌入在父站点中的 iframe 内部的真实行为。可用于验证自有服务的净化策略、确认各 sandbox 关键字的效果，或作为安全研习材料。",
      "本站面向学习 XSS / iframe 安全、测试自有服务的所有人开放，是一个公开的副项目。",
    ],
    contact: "联系",
    scenariosHeading: "场景",
    scenariosIntro:
      "按类别整理的攻击场景。在各页面复制 embed 代码片段并在自有服务上验证净化结果。",
    howToUseHeading: "使用方法",
    howToUseSteps: [
      "打开目标场景页面。",
      "在 embed 代码卡片中选择 sandbox 预设并复制 iframe 代码。",
      "粘贴到自有服务（编辑器、笔记、wiki 等）并保存。",
      "查看渲染结果与实际行为。",
    ],
    warningTitle: "注意",
    warningBody:
      "请仅对您有权测试的服务进行测试。对第三方服务的试探可能违反相关计算机网络法规。",
  },
  scenarioPage: {
    sandboxMatrix: "按 sandbox 策略的行为",
    policy: "策略",
    expectedResult: "预期结果",
    noSandbox: "无 sandbox",
    scriptsOnly: 'sandbox="allow-scripts"',
    fullSandbox: 'sandbox="" (最严)',
    sopBlocks:
      "此场景由 Same-Origin Policy 直接阻止，与 sandbox 无关。",
    works: "通过",
    blocked: "阻止",
    partial: "部分",
    actions: "执行",
    explanation: "说明",
    embedSnippet: "Embed 代码",
    copySnippet: "复制",
    copied: "已复制",
  },
  scenarios: {},
  categories: {
    navigation: "Navigation",
    communication: "Communication",
    exfil: "Exfiltration",
    phishing: "Phishing",
    delayed: "Delayed / Chained",
    annoyance: "Annoyance",
    probe: "Probe",
  },
};

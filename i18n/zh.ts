import type { IDictionary } from "./types";

export const zh: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "复制即可测试的 XSS 场景集",
    description:
      "面向授权测试的公开安全测试平台，可检查 script 标签、事件处理器、javascript: URL、DOM sink、iframe 嵌入与 postMessage 风险。",
    keywords: [
      "XSS 测试",
      "iframe 安全",
      "Web 安全",
      "postMessage 校验",
      "CSP",
      "sandbox",
      "DOM XSS",
      "安全培训",
    ],
  },
  nav: {
    home: "首页",
    simulator: "模拟器",
    learn: "学习笔记",
    forum: "论坛",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "我是前端开发者 Sangmook Kim。本站不是某个产品专用的 PoC，而是供所有人验证自有或被授权服务的 XSS 防护的公开 playground。",
      "每个场景都把真实浏览器风险拆成小型测试页面：script 标签、事件属性、javascript: URL、DOM sink、嵌入式 iframe、父页面消息通信、欺骗性 UI 和自动请求。",
      "从场景卡片或详情页复制 HTML payload 或 iframe 代码，粘贴到自己的项目中，检查渲染结果与真实浏览器行为。",
    ],
    contact: "联系",
    intentHeading: "项目意图",
    intentBody: [
      "XSS 防护不能只靠某个 HTML 过滤器名称或一行过滤规则完成。需要在真实浏览器中确认 iframe、消息、权限提示、自动请求和欺骗性 UI 到底能运行到什么程度。",
      "本站不是攻击自动化工具，而是帮助开发者和安全团队在自有或授权服务中复现并检查渲染策略的清单。",
      "所有代码片段都以复制到 dev / staging 环境为前提。若 HTML payload 执行或 iframe 场景可运行，就是需要排查的信号；若被阻止，则可以记录是哪条策略发挥了作用。",
    ],
    threatsHeading: "XSS 威胁地图",
    threatsIntro:
      "参考 Hacker101 CTF 的 XSS Playground 分类与 PortSwigger Web Security Academy 指南，本站将需要测试的风险整理如下。",
    threats: [
      {
        title: "Reflected XSS",
        body: "查询参数、搜索词、错误消息等当前请求中的数据未经正确输出编码就被立即反射到 HTML 中。",
      },
      {
        title: "Stored XSS",
        body: "评论、资料、文档正文等已保存的用户输入随后被其他用户以活动内容形式渲染。",
      },
      {
        title: "DOM-based XSS",
        body: "客户端代码读取 location、hash、postMessage 等不可信值，并写入 innerHTML 或字符串计时器等危险 sink。",
      },
      {
        title: "Filter / CSP bypass",
        body: "事件处理器、SVG/MathML、javascript: URL、编码与模板语法可能绕过薄弱黑名单或不完整 CSP。",
      },
      {
        title: "Account abuse",
        body: "脚本一旦执行，就可以以用户权限发起请求、操纵页面，并利用该用户可访问的数据。",
      },
      {
        title: "Phishing / exfiltration",
        body: "iframe、覆盖层、通知、剪贴板和 postMessage 可能诱导用户输入机密，或把可观察信息发送到外部。",
      },
    ],
    referencesHeading: "参考资料",
    references: [
      {
        label: "Hacker101 CTF write-ups",
        href: "https://github.com/8r0wn13/hacker101_ctf",
      },
      {
        label: "PortSwigger XSS overview",
        href: "https://portswigger.net/web-security/cross-site-scripting",
      },
      {
        label: "PortSwigger XSS cheat sheet",
        href: "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
      },
      {
        label: "PayloadsAllTheThings XSS",
        href: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/README.md",
      },
    ],
    scenariosHeading: "场景",
    scenariosIntro:
      "按类别整理的攻击场景。可直接从卡片复制 HTML payload 或 embed 代码，也可进入详情页深入测试。",
    howToUseHeading: "使用方法",
    howToUseSteps: [
      "打开目标场景页面。",
      "从首页卡片或详情页复制 HTML payload 或 iframe 代码。",
      "粘贴到自有服务（编辑器、笔记、wiki 等）并保存。",
      "检查渲染、sandbox、CSP、postMessage 校验和实际浏览器行为。",
    ],
    warningTitle: "注意",
    warningBody:
      "请仅对您有权测试的服务进行测试。对第三方服务的试探可能违反相关计算机网络法规。",
    contributingHeading: "贡献 (Issues / PR)",
    contributingBody: [
      "本项目采用 source-available 许可证。源代码公开供查看与贡献，但不允许 fork 后另行部署、镜像或用于商业服务。",
      "欢迎提交想法、缺陷报告、翻译改进与新场景建议。请先在 Issue 中讨论方案；获得认可后可被加为 collaborator，直接在本仓库中创建分支并提交 PR，避免长期维护 fork。",
      "完整政策见 LICENSE 与 CONTRIBUTING.md。",
    ],
    contributingLinks: [
      {
        label: "提交 Issue",
        href: "https://github.com/Kimsangmook/xss-playground/issues/new/choose",
      },
      {
        label: "Pull Requests",
        href: "https://github.com/Kimsangmook/xss-playground/pulls",
      },
      {
        label: "CONTRIBUTING.md",
        href: "https://github.com/Kimsangmook/xss-playground/blob/main/CONTRIBUTING.md",
      },
      {
        label: "LICENSE",
        href: "https://github.com/Kimsangmook/xss-playground/blob/main/LICENSE",
      },
    ],
  },
  scenarioPage: {
    sandboxMatrix: "按 sandbox 策略的行为",
    policy: "策略",
    expectedResult: "预期结果",
    noSandbox: "无 sandbox",
    scriptsOnly: 'sandbox="allow-scripts"',
    fullSandbox: 'sandbox="" (最严)',
    sopBlocks: "此场景由 Same-Origin Policy 直接阻止，与 sandbox 无关。",
    works: "通过",
    blocked: "阻止",
    partial: "部分",
    actions: "执行",
    explanation: "说明",
    embedSnippet: "Embed 代码",
    embedSnippetDescription:
      "此代码使用专用嵌入页面。粘贴到您的服务后检查渲染或拦截行为。",
    embeddedBadge: "EMBEDDED",
    htmlSurfaceTitle: "HTML payload 测试",
    domSurfaceTitle: "DOM sink 测试",
    surfaceDescription:
      "该场景测试用户输入在 HTML/DOM 中的渲染方式，而非 iframe sandbox 行为。",
    sandboxPresetLabels: [
      "无 sandbox (默认行为)",
      'sandbox="" (最严)',
      'sandbox="allow-scripts"',
      'sandbox="allow-scripts allow-same-origin"',
      'sandbox="allow-scripts allow-top-navigation"',
      'sandbox="allow-scripts allow-forms allow-popups"',
    ],
    copySnippet: "复制",
    copied: "已复制",
  },
  scenarios: {},
  categories: {
    html: "HTML Injection",
    dom: "DOM XSS",
    protocol: "URL / Protocol",
    context: "Context Breakout",
    file: "File Upload",
    content: "User Content",
    navigation: "Navigation",
    communication: "Communication",
    exfil: "Exfiltration",
    phishing: "Phishing",
    delayed: "Delayed / Chained",
    annoyance: "Annoyance",
    probe: "Probe",
  },
};

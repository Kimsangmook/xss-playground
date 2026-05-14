import type { IDictionary } from "./types";

export const en: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "iframe / sanitize attack scenarios",
    description:
      "A live PoC catalog for verifying how far HTML sanitizers like DOMPurify let iframe embeds reach. Built for developers testing their own sanitize policies, sandbox keywords, and parent-side message handlers.",
  },
  nav: {
    home: "Home",
    embedHelper: "Embed Helper",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "I'm Sangmook Kim, a frontend developer. While rolling out an iframe sanitize policy for the product I work on, I wanted to actually see what attack surface remains when iframes are allowed without a host allowlist — so I built this site.",
      "Each scenario reproduces what happens inside an iframe embedded in a parent site. Use it to verify your own sanitize policy, to see the effect of each sandbox keyword, or as a security training reference.",
      "This is an open side project — free to use for anyone learning XSS / iframe security or testing their own service.",
    ],
    contact: "Contact",
    scenariosHeading: "Scenarios",
    scenariosIntro:
      "Attack scenarios grouped by category. Copy the embed snippet from each page and verify how your service sanitizes it.",
    howToUseHeading: "How to use",
    howToUseSteps: [
      "Open a scenario page.",
      "Pick a sandbox preset on the embed snippet card and copy the iframe code.",
      "Paste it into your own service (editor, notes, wiki…) and save.",
      "Check the rendered result and what the iframe actually does.",
    ],
    warningTitle: "Caution",
    warningBody:
      "Only test services you own or have explicit permission to test. Probing third-party services may violate computer-misuse / unauthorized-access laws in your jurisdiction.",
  },
  scenarioPage: {
    sandboxMatrix: "Behavior by sandbox policy",
    policy: "Policy",
    expectedResult: "Expected result",
    noSandbox: "No sandbox",
    scriptsOnly: 'sandbox="allow-scripts"',
    fullSandbox: 'sandbox="" (strictest)',
    sopBlocks:
      "This scenario is blocked directly by Same-Origin Policy, independent of sandbox.",
    works: "works",
    blocked: "blocked",
    partial: "partial",
    actions: "Run",
    explanation: "Explanation",
    embedSnippet: "Embed snippet",
    copySnippet: "Copy snippet",
    copied: "Copied!",
  },
  scenarios: {
    "top-redirect": {
      title: "top.location forced redirect",
      summary:
        "Replace the entire parent window from inside an iframe. The classic test for sandbox allow-top-navigation.",
    },
    "post-message": {
      title: "postMessage spoofing",
      summary:
        "Send forged messages to the parent via parent.postMessage. If the parent skips event.origin validation, it can trust attacker-crafted payloads.",
    },
    "phishing-form": {
      title: "Fake login form (phishing)",
      summary:
        "Show a form that looks identical to the parent site's login UI and exfiltrate the credentials.",
    },
    "auto-download": {
      title: "Auto-download trigger",
      summary: "Force a file download without any user click.",
    },
    "popup-spam": {
      title: "popup / window.open spam",
      summary:
        "Open new windows. Same-origin popups can host arbitrary phishing UI.",
    },
    "autoplay-media": {
      title: "Autoplay media / forced fullscreen",
      summary:
        "Autoplay sound video, call requestFullscreen, and observe what gets through.",
    },
    "notification-permission": {
      title: "Notification permission / push hijack",
      summary:
        "Trigger Notification.requestPermission so the attacker domain can later push notifications.",
    },
    "clipboard-hijack": {
      title: "Clipboard hijack",
      summary: "Intercept the copy event and overwrite clipboard contents.",
    },
    "fullscreen-overlay": {
      title: "Fullscreen overlay impersonation",
      summary:
        "Cover the parent page with a fake but pixel-perfect UI rendered inside the iframe.",
    },
    "history-pollution": {
      title: "history.pushState pollution",
      summary:
        "Push a flood of history entries to wreck the parent's back-button behavior.",
    },
    "sop-probe": {
      title: "Same-Origin Policy probe (what is blocked)",
      summary:
        "Try to reach parent.document, parent.localStorage, parent cookies — confirm what SOP actually blocks.",
    },
    "form-auto-submit": {
      title: "Hidden form auto-submit (CSRF-style)",
      summary: "Submit a form to a third-party endpoint without user input.",
    },
    "beacon-exfil": {
      title: "sendBeacon / fetch exfiltration",
      summary:
        "Exfiltrate everything observable inside the iframe to an attacker server.",
    },
    "csrf-image": {
      title: "img tag GET request CSRF",
      summary:
        "The oldest CSRF: img.src to a state-changing GET endpoint sends cookies along.",
    },
    "token-exfil": {
      title: "Parent token / network exfiltration attempts",
      summary:
        "Multi-angle attempts to extract JWT, in-flight network, or storage from the parent. See exactly what SOP blocks and what slips through.",
    },
    "parent-message-listener-probe": {
      title: "Parent message-listener fingerprinting",
      summary:
        "Fire a wide range of postMessage payloads at the parent and observe responses or side effects.",
    },
    "delayed-attack": {
      title: "Delayed / auto-fire payload",
      summary:
        "Countdown via URL params, then auto-fire an action. Used to evade immediate user suspicion.",
    },
    "chained-attack": {
      title: "Chained attack (phishing + fullscreen + redirect)",
      summary:
        "Fullscreen fake UI → credential capture → top redirect to the real site to cover tracks.",
    },
  },
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

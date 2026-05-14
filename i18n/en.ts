import type { IDictionary } from "./types";

export const en: IDictionary = {
  site: {
    name: "XSS Playground",
    tagline: "Copy-and-test XSS scenarios",
    description:
      "An open security testing playground for checking script tags, event handlers, javascript: URLs, DOM sinks, iframe embeds, and postMessage risks in services you are authorized to test.",
    keywords: [
      "XSS testing",
      "iframe security",
      "web security",
      "postMessage validation",
      "CSP",
      "sandbox",
      "DOM XSS",
      "security training",
    ],
  },
  nav: {
    home: "Home",
    embedHelper: "Embed Helper",
    github: "GitHub",
  },
  home: {
    aboutHeading: "About",
    aboutBody: [
      "I'm Sangmook Kim, a frontend developer. This site is not a product-specific PoC; it is an open playground for anyone who wants to verify XSS defenses in web services they own or are authorized to test.",
      "Each scenario turns a realistic browser risk into a small test page: script tags, event-handler attributes, javascript: URLs, DOM sinks, embedded iframes, parent-window messaging, deceptive UI, and automatic requests.",
      "Copy an HTML payload or iframe snippet from a scenario card or detail page, paste it into your own project, and check both the render result and the actual browser behavior.",
    ],
    contact: "Contact",
    intentHeading: "Project intent",
    intentBody: [
      "XSS defense is not finished by naming an HTML filter or adding one line of filtering. You need to see what the browser actually allows across iframes, messages, permission prompts, automatic requests, and deceptive UI.",
      "This site is not an attack automation tool. It is a repeatable checklist for developers and security teams testing rendering policies in services they own or are authorized to assess.",
      "Every snippet is designed to be copied into a dev or staging environment. If an HTML payload executes or an iframe scenario works, it is a signal to investigate; if it is blocked, you can record which policy stopped it.",
    ],
    threatsHeading: "XSS threat map",
    threatsIntro:
      "Based on the Hacker101 CTF XSS Playground categories and PortSwigger Web Security Academy guidance, this project groups the risks you should test into these areas.",
    threats: [
      {
        title: "Reflected XSS",
        body: "Request data such as query strings, search terms, or error messages is immediately reflected into HTML without the right output encoding.",
      },
      {
        title: "Stored XSS",
        body: "Saved input such as comments, profiles, or document bodies is later rendered for other users as active content.",
      },
      {
        title: "DOM-based XSS",
        body: "Client-side code reads untrusted values from location, hash, postMessage, or storage and writes them into unsafe sinks like innerHTML or string-based timers.",
      },
      {
        title: "Filter / CSP bypass",
        body: "Event handlers, SVG/MathML, javascript: URLs, encodings, and template syntax can bypass weak blacklists or incomplete CSP rules.",
      },
      {
        title: "Account abuse",
        body: "Once script runs, it can act with the user's privileges, perform requests, manipulate the page, and access data the user can access.",
      },
      {
        title: "Phishing / exfiltration",
        body: "iframes, overlays, notifications, clipboard hooks, and postMessage can trick users into entering secrets or leak observable data out of the page.",
      },
    ],
    referencesHeading: "References",
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
    ],
    scenariosHeading: "Scenarios",
    scenariosIntro:
      "Attack scenarios grouped by category. Copy an HTML payload or iframe embed directly from a card, or open a detail page for deeper testing.",
    howToUseHeading: "How to use",
    howToUseSteps: [
      "Open a scenario page.",
      "Copy the HTML payload or iframe code from the home card or detail page.",
      "Paste it into your own service (editor, notes, wiki…) and save.",
      "Check rendering, sandbox behavior, CSP, postMessage validation, and the actual browser behavior.",
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
    "script-tag-injection": {
      title: "script tag injection",
      summary:
        "Check whether a raw script tag executes when user input is parsed as an HTML document.",
    },
    "event-handler-attribute": {
      title: "Event-handler attribute injection",
      summary:
        "Check whether on* attributes such as img onerror or details ontoggle survive filtering and execute.",
    },
    "javascript-url": {
      title: "javascript: URL protocol",
      summary:
        "Check whether javascript: remains in URL attributes such as href or action and executes on user interaction.",
    },
    "svg-onload": {
      title: "SVG / MathML onload payload",
      summary:
        "Check whether SVG, MathML namespaces, and event attributes bypass weak filters.",
    },
    "dom-innerhtml-sink": {
      title: "DOM innerHTML sink",
      summary:
        "Check whether location, hash, postMessage, or other untrusted values reach unsafe sinks such as innerHTML.",
    },
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
    html: "HTML Injection",
    dom: "DOM XSS",
    protocol: "URL / Protocol",
    navigation: "Navigation",
    communication: "Communication",
    exfil: "Exfiltration",
    phishing: "Phishing",
    delayed: "Delayed / Chained",
    annoyance: "Annoyance",
    probe: "Probe",
  },
};

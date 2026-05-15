import type { IScenarioPageI18n } from "../types";
import type { Locale } from "@/i18n/types";

const payloads = [
  {
    label: "SVG file body",
    value:
      '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(\'svg-file-xss\')"></svg>',
  },
  {
    label: "HTML file body",
    value:
      '<!doctype html><meta charset="utf-8"><script>alert("html-upload-xss")</script>',
  },
];

const ko: IScenarioPageI18n = {
  title: "파일 업로드 미리보기 XSS",
  summary:
    "SVG, XML, HTML 파일을 업로드 후 미리보기로 렌더링할 때 active content 가 실행되는지 확인한다.",
  checks: [
    "업로드 파일을 같은 origin 에서 HTML 로 열지 않는지 확인",
    "SVG 는 이미지로만 제공하거나 별도 다운로드 도메인/첨부 헤더를 사용하는지 확인",
    "MIME sniffing 방지를 위해 Content-Type 과 X-Content-Type-Options 를 설정하는지 확인",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "업로드된 SVG 를 img 로만 쓰는지, inline/object/embed 로 렌더링하는지 확인한다.",
    },
    {
      ...payloads[1],
      note: "첨부파일 미리보기, 문서 변환, 관리자 검수 화면에서 HTML 이 실행되는지 확인한다.",
    },
  ],
  explanationHeading: "해설",
  explanation: [
    "파일 업로드 XSS 는 저장형 XSS와 비슷하지만, 위험 표면이 첨부파일 미리보기/다운로드 도메인/운영자 검수 화면으로 퍼집니다.",
    "SVG 는 이미지처럼 보이지만 XML 기반 문서라서 inline 렌더링, object/embed, 잘못된 MIME type 에서 active content 문제가 생길 수 있습니다.",
    "사용자 업로드 파일은 가능하면 별도 cookie 없는 도메인에서 제공하고, HTML 로 inline 실행되지 않도록 Content-Disposition 과 MIME 정책을 고정하세요.",
  ],
};

const en: IScenarioPageI18n = {
  title: "File upload preview XSS",
  summary:
    "Check whether active content runs when uploaded SVG, XML, or HTML files are rendered as previews.",
  checks: [
    "Do not open uploaded files as HTML on the same origin",
    "Serve SVG as an image only, or use a separate download domain / attachment headers",
    "Set Content-Type and X-Content-Type-Options to prevent MIME sniffing",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "Checks whether uploaded SVG is only used as an image or rendered inline/object/embed.",
    },
    {
      ...payloads[1],
      note: "Checks attachment previews, document conversion, and admin review surfaces.",
    },
  ],
  explanationHeading: "Explanation",
  explanation: [
    "File-upload XSS is a stored-XSS cousin where the risky surface spreads to attachment previews, download domains, and admin review tools.",
    "SVG looks like an image, but it is an XML document. Inline rendering, object/embed, or incorrect MIME types can introduce active content.",
    "Serve user uploads from a cookie-less domain where possible, and force attachment / MIME policy so HTML cannot execute inline.",
  ],
};

const ja: IScenarioPageI18n = {
  title: "File upload preview XSS",
  summary:
    "アップロードされた SVG、XML、HTML ファイルをプレビュー表示するとき active content が実行されるか確認します。",
  checks: [
    "アップロードファイルを同一 origin で HTML として開かないか確認",
    "SVG は画像としてのみ提供するか、別 download domain / attachment header を使うか確認",
    "MIME sniffing 防止のため Content-Type と X-Content-Type-Options を設定するか確認",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "SVG が img のみで使われるか、inline/object/embed で描画されるか確認します。",
    },
    {
      ...payloads[1],
      note: "添付 preview、文書変換、管理者レビュー画面で HTML が実行されるか確認します。",
    },
  ],
  explanationHeading: "解説",
  explanation: [
    "File upload XSS は stored XSS に近く、添付 preview、download domain、管理者 review tool に攻撃面が広がります。",
    "SVG は画像に見えますが XML 文書です。inline rendering、object/embed、不正確な MIME type で active content 問題が起きます。",
    "ユーザー upload は可能なら cookie のない別 domain から提供し、HTML が inline 実行されないよう attachment/MIME policy を固定します。",
  ],
};

const zh: IScenarioPageI18n = {
  title: "文件上传预览 XSS",
  summary:
    "检查上传的 SVG、XML、HTML 文件在预览渲染时是否会执行 active content。",
  checks: [
    "不要在同源下把上传文件作为 HTML 打开",
    "SVG 仅作为图片提供，或使用独立下载域名 / attachment header",
    "设置 Content-Type 与 X-Content-Type-Options 防止 MIME sniffing",
  ],
  payloads: [
    {
      ...payloads[0],
      note: "检查上传 SVG 是只作为 img 使用，还是被 inline/object/embed 渲染。",
    },
    {
      ...payloads[1],
      note: "检查附件预览、文档转换、管理员审核页面是否执行 HTML。",
    },
  ],
  explanationHeading: "说明",
  explanation: [
    "文件上传 XSS 类似存储型 XSS，但风险面扩展到附件预览、下载域名和管理员审核工具。",
    "SVG 看起来像图片，但它是 XML 文档。inline 渲染、object/embed 或错误 MIME type 可能带来 active content。",
    "用户上传尽量从无 cookie 的独立域名提供，并固定 attachment/MIME 策略，避免 HTML inline 执行。",
  ],
};

export const I18N: Record<Locale, IScenarioPageI18n> = { ko, en, ja, zh };

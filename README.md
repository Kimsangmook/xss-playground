# XSS Playground

## Environment variables

Local dev 에서는 프로젝트 루트에 `.env.local` 을 만들어 채우고, Vercel 배포 시에는 Project Settings → Environment Variables 에 같은 키/값을 등록하세요.

| Key | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인. 기본값은 `https://xss-playground.com`, 끝에 / 없이. |
| `NEXT_PUBLIC_AUTHOR_NAME` | 홈페이지 about 섹션 + JSON-LD 의 author 이름 |
| `NEXT_PUBLIC_AUTHOR_EMAIL` | (옵션) about 섹션의 contact 링크 |
| `NEXT_PUBLIC_AUTHOR_GITHUB` | GitHub username (about 섹션 + JSON-LD) |
| `NEXT_PUBLIC_GA_ID` | (옵션) Google Analytics 4 Measurement ID (예: `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_ADSENSE_ID` | (옵션) AdSense Publisher ID (예: `ca-pub-...`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | (옵션) Search Console HTML 태그 인증 값 |

값이 비어 있으면 해당 기능(GA, AdSense, GSC 메타)은 자동으로 비활성화됩니다.

---

권한 있는 웹 서비스에서 XSS 대응을 빠르게 확인하기 위한 공개 플레이그라운드입니다. 각 시나리오는 HTML payload 또는 `<iframe src="https://...">` 로 임베드할 수 있는 전용 테스트 페이지를 제공하며, 사용자는 카드나 상세 페이지에서 스니펫을 복사해 본인 프로젝트의 에디터, CMS, 위키, 댓글, 노트, 대시보드 등에 붙여 넣고 렌더링/차단 여부를 확인할 수 있습니다.

> 본인이 권한을 가진 서비스에 대해서만 사용하세요. 타인의 서비스를 대상으로 시도하면 부정접근 / 정보통신망법 위반에 해당할 수 있습니다.

## XSS 위협 요약

Hacker101 CTF 의 XSS Playground write-up 은 반사형, 저장형, DOM 기반, CSP 우회, 정보 유출형 XSS 를 주요 연습 축으로 제시합니다. PortSwigger Web Security Academy 는 XSS 를 크게 reflected / stored / DOM-based 로 설명하고, 치트시트에서는 이벤트 핸들러, 태그, 프로토콜, 인코딩, 템플릿, CSP 우회 같은 페이로드 표면을 폭넓게 정리합니다.

이 프로젝트는 위 자료를 다음 테스트 축으로 압축합니다.

| 위협 | 확인할 것 |
| --- | --- |
| 반사형 XSS | URL, 검색어, 오류 메시지 같은 현재 요청 입력이 응답 HTML 에 안전하지 않게 반영되는지 확인 |
| 저장형 XSS | 댓글, 프로필, 문서 본문처럼 저장된 사용자 입력이 다른 사용자에게 실행 가능한 콘텐츠로 렌더링되는지 확인 |
| DOM 기반 XSS | `location`, `hash`, `postMessage`, storage 값이 `innerHTML`, 문자열 기반 timer/eval 같은 sink 로 들어가는지 확인 |
| 필터 / CSP 우회 | 이벤트 핸들러, SVG/MathML, `javascript:` URL, 인코딩, 템플릿 문법이 약한 필터나 불완전한 CSP 를 우회하는지 확인 |
| 계정 권한 악용 | XSS 가 사용자의 권한으로 요청을 보내거나 화면을 조작하고 접근 가능한 데이터를 악용할 수 있는지 확인 |
| 피싱 / 정보 유출 | iframe, 오버레이, 알림, 클립보드, `postMessage`, `sendBeacon` 으로 사용자 기만 또는 관찰 가능한 정보 유출이 가능한지 확인 |

## 시나리오 목록

| 카테고리 | 시나리오 | sandbox 없을 때 |
| --- | --- | --- |
| HTML Injection | script 태그 삽입 | HTML 렌더링 정책 확인 |
| HTML Injection | 이벤트 핸들러 속성 삽입 | HTML 렌더링 정책 확인 |
| HTML Injection | SVG / MathML onload payload | HTML 렌더링 정책 확인 |
| DOM XSS | DOM innerHTML sink | DOM sink 확인 |
| URL / Protocol | javascript: URL 프로토콜 | URL 속성 검증 확인 |
| Navigation | top.location 강제 리다이렉트 | 동작 (피싱 직결) |
| Communication | postMessage 스푸핑 | 동작 |
| Communication | 숨겨진 form 자동 submit (CSRF-like) | 동작 |
| Communication | sendBeacon / fetch exfiltration | 동작 |
| Communication | img 태그 GET CSRF | 동작 |
| Exfiltration | 부모 토큰 / 네트워크 탈취 시도 | 부분 |
| Phishing | 가짜 로그인 폼 | 동작 |
| Phishing | 풀스크린 오버레이 위장 | 동작 |
| Delayed / Chained | 지연 / 자동 실행 페이로드 | 동작 |
| Delayed / Chained | 체인 공격 (피싱 + 풀스크린 + redirect) | 동작 |
| Annoyance | window.open / popup 스팸 | 동작 |
| Annoyance | 자동재생 미디어 / 풀스크린 | 부분 |
| Annoyance | 알림 권한 요청 | 동작 |
| Annoyance | 클립보드 hijack | 동작 |
| Annoyance | history.pushState 오염 | 동작 |
| Probe | Same-Origin Policy 실패 확인 | (전부 차단되어야 정상) |
| Probe | 부모 message 리스너 fingerprinting | 동작 |

## 로컬 실행

```bash
yarn install
yarn dev
# http://localhost:3000
```

## Vercel 배포

저장소를 Vercel 에 import 하면 별도 설정 없이 배포됩니다. 운영 도메인은 `https://xss-playground.com` 입니다.

배포 후 테스트 흐름:

1. 홈의 시나리오 카드에서 HTML payload 또는 `<iframe src=".../embed/{slug}">` 코드를 바로 복사하거나, 상세 페이지에서 더 자세한 스니펫을 고른 뒤 복사합니다.
2. 본인 서비스의 dev / staging 환경에서 HTML 이 렌더링되는 위치에 스니펫을 붙여 넣고 저장합니다.
3. 렌더링 차단 여부, sandbox 정책, CSP, `postMessage` origin 검증, 네트워크 요청, 브라우저 권한 프롬프트를 확인합니다.
4. 차단이 필요한 시나리오가 동작한다면 렌더링 정책, iframe allowlist, CSP, sandbox 속성을 조정합니다.

같은 시나리오의 sandbox 정책별 차이는 사이드바의 **부모 페이지 임베드 헬퍼** 에서 한 페이지에 묶어서 비교할 수 있습니다.

## 디자인 결정

- **복사 가능한 `/embed/*` 페이지**: 상세 설명 페이지와 실제 임베드 테스트 페이지를 분리했습니다. 사용자는 `/embed/{slug}` iframe 만 복사해 본인 서비스에 붙여 넣으면 됩니다.
- **frame-ancestors 를 열어둠**: `/embed/*` 가 외부 부모 페이지에 임베드 되어야 테스트가 가능해서 `next.config.js` 에서 의도적으로 허용했습니다.
- **외부 송신은 httpbin.org 로**: 실제 attacker 서버를 띄우지 않고 공개 echo 엔드포인트로 보냅니다. 응답이 cross-origin 이라 iframe 안에서 읽을 수는 없지만 "요청이 나갔다" 자체는 네트워크 탭에서 확인 가능.

## 권장 방어 체크리스트

1. iframe 을 허용해야 한다면 `sandbox` 속성을 기본 부착하고 필요한 권한만 최소로 엽니다.
2. iframe, img, script, link 등의 외부 URL 은 신뢰 도메인 allowlist 로 제한합니다.
3. 부모 측 `window.addEventListener("message", ...)` 핸들러의 `event.origin` 검증 일괄 확인
4. CSP `default-src`, `script-src`, `frame-src`, `img-src`, `connect-src` 도입 검토
5. 사용자 입력은 출력 컨텍스트별로 HTML / URL / JavaScript / CSS 인코딩을 적용하고, 저장형 콘텐츠는 렌더링 전에 별도 검증합니다.

## 참고 자료

- [8r0wn13/hacker101_ctf](https://github.com/8r0wn13/hacker101_ctf)
- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting)
- [PortSwigger: XSS cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

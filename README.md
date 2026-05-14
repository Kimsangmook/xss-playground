# XSS Playground

## Environment variables

Local dev 에서는 프로젝트 루트에 `.env.local` 을 만들어 채우고, Vercel 배포 시에는 Project Settings → Environment Variables 에 같은 키/값을 등록하세요.

| Key | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인. https:// 포함, 끝에 / 없이. |
| `NEXT_PUBLIC_AUTHOR_NAME` | 홈페이지 about 섹션 + JSON-LD 의 author 이름 |
| `NEXT_PUBLIC_AUTHOR_EMAIL` | (옵션) about 섹션의 contact 링크 |
| `NEXT_PUBLIC_AUTHOR_GITHUB` | GitHub username (about 섹션 + JSON-LD) |
| `NEXT_PUBLIC_GA_ID` | (옵션) Google Analytics 4 Measurement ID (예: `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_ADSENSE_ID` | (옵션) AdSense Publisher ID (예: `ca-pub-...`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | (옵션) Search Console HTML 태그 인증 값 |

값이 비어 있으면 해당 기능(GA, AdSense, GSC 메타)은 자동으로 비활성화됩니다.

---

알렌 sanitize 정책(`DOMPurify` + iframe 허용, 화이트리스트 제거) 의 실제 보안 영향을 검증하기 위한 PoC 사이트입니다. 부모 페이지(알렌 마이노트, 커뮤니티, cpx 노트 등)에서 `<iframe src="https://...">` 으로 임베드되어 동작하는 다양한 공격 시나리오를 담고 있습니다.

> 본인이 권한을 가진 서비스에 대해서만 사용하세요. 타인의 서비스를 대상으로 시도하면 부정접근 / 정보통신망법 위반에 해당할 수 있습니다.

## 시나리오 목록

| 카테고리 | 시나리오 | sandbox 없을 때 |
| --- | --- | --- |
| Navigation | top.location 강제 리다이렉트 | 동작 (피싱 직결) |
| Communication | postMessage 스푸핑 | 동작 |
| Communication | 숨겨진 form 자동 submit (CSRF-like) | 동작 |
| Communication | sendBeacon / fetch exfiltration | 동작 |
| Communication | img 태그 GET CSRF | 동작 |
| Phishing | 가짜 로그인 폼 | 동작 |
| Phishing | 풀스크린 오버레이 위장 | 동작 |
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

저장소를 Vercel 에 import 하면 별도 설정 없이 배포됩니다. 도메인은 본인 vercel 프로젝트의 자동 생성 도메인을 그대로 사용하면 됩니다.

배포 후 알렌 sanitize PoC 흐름:

1. 좌측 시나리오 페이지를 연다.
2. 페이지 상단의 "임베드 스니펫" 카드에서 `<iframe src=...>` 복사.
3. 알렌 dev / staging 의 마이노트 에디터에 그 스니펫을 붙여 넣고 저장.
4. 렌더링된 페이지에서 sanitize 통과 여부 + 실제 동작 확인.

같은 시나리오의 sandbox 정책별 차이는 사이드바의 **부모 페이지 임베드 헬퍼** 에서 한 페이지에 묶어서 비교할 수 있습니다.

## 디자인 결정

- **호스트 화이트리스트 제거 vs 유지**: 알렌은 현재 https 프로토콜만 검증하고 호스트는 무엇이든 허용합니다. 이 사이트는 그 정책에서 통과되는 임의 https 호스트 역할을 합니다.
- **X-Frame-Options 와 frame-ancestors 를 풀어둠**: `/scenarios/*` 가 부모 페이지에 임베드 되어야 PoC 가 의미가 있어서 `next.config.js` 에서 의도적으로 해제했습니다.
- **외부 송신은 httpbin.org 로**: 실제 attacker 서버를 띄우지 않고 공개 echo 엔드포인트로 보냅니다. 응답이 cross-origin 이라 iframe 안에서 읽을 수는 없지만 "요청이 나갔다" 자체는 네트워크 탭에서 확인 가능.

## 권장 후속 작업 (알렌 측)

1. sanitize 단계에서 iframe 에 `sandbox` 속성을 강제 부착 (예: `sandbox="allow-scripts allow-popups-to-escape-sandbox"`)
2. host 화이트리스트 복귀 (유튜브, 비메오 등) + 환경변수로 관리
3. 부모 측 `window.addEventListener("message", ...)` 핸들러의 `event.origin` 검증 일괄 확인
4. CSP `frame-src`, `img-src` 도입 검토

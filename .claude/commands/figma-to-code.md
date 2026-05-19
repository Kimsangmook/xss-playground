Figma 디자인을 XSS Playground 코드로 구현합니다.

절차:

1. Figma context와 screenshot을 확인합니다.
2. 기존 UI 패턴을 먼저 찾습니다.
3. App Router 구조와 CSS Modules/global CSS 변수에 맞게 구현합니다.
4. 마케팅식 랜딩이 아니라 실제 사용 가능한 화면을 우선합니다.
5. 반응형, 텍스트 overflow, 접근성을 확인합니다.
6. 변경 후 `yarn lint`, `yarn typecheck`, 필요 시 브라우저 스크린샷으로 검증합니다.

주의:

- Allen Web의 Styled Components/token 규칙을 그대로 적용하지 않습니다.
- 이 프로젝트는 현재 CSS Modules와 global CSS를 사용합니다.
- 보안 학습 도구의 정보 밀도와 명확성을 우선합니다.

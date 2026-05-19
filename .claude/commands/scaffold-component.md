프로젝트 컨벤션에 맞는 새 시나리오, embed handler, 또는 feature component를
스캐폴딩합니다.

입력: `$ARGUMENTS`

예시:

- `/scaffold-component dom-clobbering scenario`
- `/scaffold-component sanitize-lab feature`

절차:

1. feature name과 type을 파싱합니다.
2. 기존 유사 파일을 찾습니다.
3. `component-scaffolder` agent 절차에 맞춰 필요한 파일을 생성합니다.
4. i18n과 `lib/scenarios.ts` 누락 여부를 확인합니다.
5. 생성 파일 목록과 검증 결과를 보고합니다.

문서와 코드 사이의 드리프트를 점검합니다.

검사 항목:

1. 루트 `CLAUDE.md`의 구조 설명이 실제 디렉토리와 맞는지 확인
2. `.claude/agents/*.md`에 guardrail 또는 constraints가 있는지 확인
3. `.claude/commands/*.md`가 현재 프로젝트 명령어(`yarn lint`,
   `yarn typecheck`, `yarn build`)를 사용하는지 확인
4. `lib/scenarios.ts`의 scenario slug가 실제 페이지/embed 구현과 맞는지 확인
5. i18n dictionary 키 누락 여부 확인

출력은 PASS/WARN/FAIL로 구분합니다.

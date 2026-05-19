프로젝트 건강 상태를 점검합니다.

실행 항목:

1. `git status`
2. `yarn format:check`
3. `yarn lint`
4. `yarn typecheck`
5. `yarn build`

추가 점검:

- `tsconfig.tsbuildinfo`, 로컬 인증서, `.env*`가 추적되지 않는지 확인
- 시나리오 추가 시 모든 locale dictionary가 갱신되었는지 확인
- `/embed/*`와 simulator 관련 변경이 있는 경우 CSP/sandbox 영향 언급

결과는 한국어 요약으로 출력합니다.

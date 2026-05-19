현재 브랜치의 변경 사항을 XSS Playground 컨벤션 기준으로 구조적 코드 리뷰합니다.

1. `git status`와 현재 브랜치를 확인합니다.
2. 가능하면 `git diff main...HEAD --name-only`로 변경 파일을 수집합니다.
3. 루트 `CLAUDE.md`와 관련 파일을 읽습니다.
4. `yarn lint`, `yarn typecheck`, 필요 시 `yarn build` 결과를 확인합니다.
5. 한국어로 Findings를 먼저 출력합니다.

리뷰 관점:

- XSS 시나리오 정확성, 현대 브라우저 제약 반영 여부
- 방어 솔루션의 실무 적합성
- i18n 누락 여부
- `/embed/*`, sandbox, CSP, postMessage 동작 보존 여부
- TypeScript, hooks, import, formatting 컨벤션

출력 형식:

```markdown
## Findings

- [P1] path:line - 내용

## Open Questions

- ...

## Verification

- ...
```

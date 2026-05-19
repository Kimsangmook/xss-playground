구현 작업을 단계별로 수행합니다.

## Phase 0: Context

- `git status`
- 현재 브랜치 확인
- 관련 파일과 `CLAUDE.md` 읽기

## Phase 1: Plan

- 요구사항 정리
- 영향 범위
- 리스크 분류
- 검증 계획

## Phase 2: Implement

- 기존 패턴을 우선 재사용
- i18n, scenario registry, embed runtime 영향 확인
- 변경 범위를 요청 사항에 맞게 유지

## Phase 3: Verify

가능하면 아래를 실행합니다:

```bash
yarn format:check
yarn lint
yarn typecheck
yarn build
```

## Phase 4: Report

한국어로 변경 요약, 검증 결과, 남은 리스크를 짧게 보고합니다.

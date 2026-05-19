---
description: "PR 분석 후 상세설명 자동 생성"
allowed-tools: ["Read", "Edit", "Write", "Bash", "Grep"]
---

XSS Playground PR의 변경사항을 분석하여 `.github/pull_request_template.md`
형식에 맞는 상세 설명을 생성합니다.

## Usage

- `/pr-description` - 현재 브랜치 변경사항으로 설명 생성
- `/pr-description PR번호` - PR을 분석해 설명 생성
- `/pr-description --create` - 현재 브랜치로 PR 생성 초안 작성

## Process

1. `git status`, 현재 브랜치, base branch를 확인합니다.
2. `git diff main...HEAD` 또는 PR diff를 분석합니다.
3. 변경 파일을 유형별로 묶습니다:
   - convention/config/local setup
   - scenario/content/i18n
   - embed/simulator behavior
   - docs/README
4. 템플릿 섹션을 채웁니다:
   - `What is this PR?`
   - `Changes`
   - `Screenshot`
   - `Test CheckList`

## Notes

- 테스트 체크리스트에는 실제 실행한 명령만 적습니다.
- 시각 변화가 없으면 Screenshot 섹션에 "N/A"를 명시합니다.

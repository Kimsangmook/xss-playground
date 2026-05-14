# Contributing to XSS Playground

Thanks for considering a contribution. Issues and pull requests on the
canonical repository are welcome.

> **Note on licensing.** This project is **source-available, not
> open-source**. Forking for the purpose of operating a separate
> deployment, mirror, or competing site is **not permitted** — see
> [LICENSE](./LICENSE) for details. The PR workflow below is the only
> intended way to contribute.

## What's welcome

- New XSS / iframe / sandbox / postMessage scenarios with copyable payloads
- Translation improvements for **ko / en / ja / zh** (see `i18n/`)
- Bug fixes, SEO/accessibility improvements
- Documentation improvements

## What's not accepted

- Wholesale copies of the project under a different name
- Changes that remove the LICENSE or author attribution
- Off-topic features unrelated to web security learning
- Anything that targets services without the operator's explicit consent

## How to file an issue

1. Search existing issues first: <https://github.com/Kimsangmook/xss-playground/issues>
2. If none match, open a new issue with:
   - **Scenario / page** affected (URL or slug)
   - **Browser / OS** if relevant
   - **Expected vs actual** behavior
   - **Suggested change** if you already have one in mind

Ideas without code are also welcome — please open an issue first.

## How to submit a pull request

GitHub's standard PR flow normally goes through a personal fork. To stay
within the license:

1. **Open an issue first** describing what you want to change.
2. If the change is accepted in principle, you can be added as a
   collaborator and push a branch **directly to this repo**, avoiding a
   long-lived fork.
3. If you must work from a fork temporarily, please **delete it after
   the PR is merged or closed**.

### Branch & commit conventions

- Branch name: `feat/<short-slug>`, `fix/<short-slug>`, `docs/<short-slug>`,
  `chore/<short-slug>`
- Commit style: short imperative title (e.g. `feat: add dom-eval sink scenario`)
- Keep PRs small and focused.

### PR body format

This repository follows the same PR template used by 모네플 `study-service-web`.
`.github/pull_request_template.md` will automatically fill the PR body with the
four sections below — please complete each one:

1. **What is this PR? 🔎** — 이 PR의 목적을 한두 문장으로 설명
2. **Changes 🖊️** — 어떤 파일의 어떤 코드를 어떤 관점에서 어떻게 변경했는지
3. **Screenshot 📷** — 시각적으로 보이는 변경이 있다면 before/after 이미지
4. **Test CheckList ☑** — 어떤 테스트를 했는지 + `yarn lint` / `yarn build` 통과 여부

`main` 브랜치는 보호되어 있어 직접 push 가 불가능합니다. 모든 변경은 PR 을
통해서만 들어오며, 머지는 레포 오너가 PR 리뷰 후 직접 수행합니다.

### Local setup

```bash
yarn install
yarn dev
# http://localhost:3000
```

Lint must pass:

```bash
yarn lint
yarn build
```

### Adding a scenario

1. Add an entry to `lib/scenarios.ts`.
2. Add `title` and `summary` to all four locales in `i18n/{ko,en,ja,zh}.ts`
   (English at minimum; other locales may use the English fallback).
3. If the scenario is iframe-based, add an embed component in
   `app/embed/[slug]/scenarios.tsx`.
4. If it is an HTML-payload scenario, add the payload to the scenario
   definition.
5. Update screenshots / docs as needed.

## Code of conduct

Be kind, stay on topic, and assume good intent. This site exists to help
people improve their own services' security posture — please keep
discussions aligned with that goal.

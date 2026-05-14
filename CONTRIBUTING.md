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

- Branch name: `feat/<short-slug>`, `fix/<short-slug>`, `docs/<short-slug>`
- Commit style: short imperative title (e.g. `feat: add dom-eval sink scenario`)
- Keep PRs small and focused.

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

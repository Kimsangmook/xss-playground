# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

XSS Playground is a Next.js App Router project for learning, discussing, and
simulating XSS behavior in authorized environments. The project exposes
localized learning pages, copyable payload examples, embeddable `/embed/*`
scenario pages, and an interactive sandbox simulation board.

## Architecture

- Framework: Next.js 14 App Router / React 18 / TypeScript strict mode
- Styling: CSS Modules for feature UI, global CSS variables in `app/globals.css`
- Localization: `ko`, `en`, `ja`, `zh` dictionaries under `i18n/`
- Scenario registry: `lib/scenarios.ts`
- Scenario pages: `app/[locale]/scenarios/*`
- Embeddable scenario runtime: `app/embed/[slug]/*`
- Simulator feature slice: `features/xss-simulation/*`
- Forum integration: GitHub Issues via `lib/api/github.ts`

## Claude Code Automation

Allen Web's Claude automation layout is mirrored here with project-specific
agents and commands:

- Agents: `planner`, `frontend-architect`, `code-reviewer`,
  `component-scaffolder`
- Commands: `/dev-task`, `/figma-to-code`, `/update-docs`, `/init-docs`,
  `/pr-description`, `/check-health`, `/review-code`, `/scaffold-component`,
  `/check-entropy`, `/harness-report`

## Development Rules

- Use Korean when communicating with the maintainer.
- Prefer existing App Router and feature-slice patterns over new abstractions.
- Keep educational XSS examples safe, explicit, and framed for authorized use.
- When adding or changing scenarios, update all locale dictionaries.
- Keep `/embed/*` pages lightweight, embeddable, and noindex-oriented.
- Do not remove the intentional `frame-ancestors` behavior without checking the
  simulator and external embed use case.
- Keep generated local certificates and TypeScript build cache out of git.

## Code Conventions

- Run `yarn lint`, `yarn format:check`, `yarn typecheck`, and `yarn build`
  before completing broad changes.
- Use arrow function components and typed props.
- Prefer `const`, early returns, optional chaining, and template literals.
- Avoid `any`, `@ts-ignore`, and global console usage in app code.
- Node scripts and local server files may use `console` for operational logs.

## Scenario Quality Checklist

- The payload demonstrates one clear browser/security behavior.
- The page explains modern browser caveats and permission/user-gesture limits.
- The scenario has localized title and summary in `i18n/{ko,en,ja,zh}.ts`.
- The sandbox behavior matrix in `lib/scenarios.ts` matches real behavior.
- Defensive guidance favors allowlists, contextual encoding, CSP, sandboxing,
  origin checks, and DOMPurify where HTML rendering is intentional.

## Local Development

```bash
yarn setup
yarn dev
# https://local.xss-playground.com
```

Use `yarn dev:http` only when HTTPS/domain behavior is not being tested.

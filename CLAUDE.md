# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js 22 and npm. There is no lint script.

```bash
npm install
npm start                                          # serve at http://localhost:4200/
npm run build                                      # production build
npx ng build --base-href /CEULandingPage/          # deployment-equivalent build (GitHub Pages base path)
npm test -- --watch=false                          # full test run
npx ng test --watch=false --include src/app/app.spec.ts   # single-spec run; swap the path for another *.spec.ts
npm run watch                                      # dev-config build, watch mode
```

Prettier is configured in `.prettierrc` (single quotes, 100 print width, Angular parser for templates) but has no npm script wired to it.

## Architecture

Static, client-rendered Angular 22 single-page app. No backend, no auth, no route-driven flow (`src/app/app.routes.ts` is intentionally empty).

- `src/main.ts` bootstraps the standalone `App` component with `src/app/app.config.ts` (provides the browser error listener and `HttpClient`).
- `src/app/app.ts` is the **only** page-level orchestrator: owns the `language` signal, loading/ready/error state, `document.documentElement.lang` updates, and the `TeamDataService` subscription. Do not add section-specific markup or behavior here.
- `src/app/app.html` composes the page in order: header, hero, content status, about, jersey gallery, schedule, roster, results, upcoming hosted event, recent events, recruitment, footer.
- Page sections are standalone components under `src/app/components/<section-name>/`, each with typed inputs fed by `App`. The header emits language changes back up to `App`. Add new sections the same way — register in `App`, compose in `app.html` — rather than growing the root template.
- `TeamDataService` (`src/app/services/`) fetches the **relative** URL `data/team-data.json` and runtime-validates the JSON root, required collections, selected `site` fields, and the `upcomingEvent` content/CTA shape before casting to `TeamData`. Never change this to a root-absolute `/data/team-data.json` — that breaks the `/CEULandingPage/` GitHub Pages deployment. `public/` is copied verbatim into the build by `angular.json`.
- `src/app/models/team-data.ts` is the shared data contract, grouped under `site`, `schedule`, `roster`, `results`, `upcomingEvent`, `events`, `recruitment`, `contact`. Notable shapes:
  - `site.introduction` is a non-empty bilingual-paragraph array; item 0 is the club name, the rest render in About. `site.values` holds the three bilingual mission cards below it.
  - `upcomingEvent` powers the text-first hosted-tournament block before the recent-events gallery; its CTA is optional but `buttonLabel`/`buttonUrl` must be provided together.
  - `events` records use `host`/`hostLogo` for host clubs, `endDate`/`endDateLabel` for multi-day events, `fit: "contain"` for poster-style images, and a `background` field rendered as the first gallery image. `RecentEventsComponent` sorts these newest-first by ISO `date` — JSON array order is not display order.
- Bilingual copy is `{ vi, en }` objects rendered via `LocalizedTextPipe` (`src/app/shared/localized-text.pipe.ts`) — pass the active `Language` into section components and use the pipe rather than picking translations ad hoc. Shared schedule/result labels live in `src/app/shared/content-labels.ts`.
- Fixed brand imagery (avatar, wordmark/background, jersey images) is centralized in `src/app/shared/brand-assets.ts` — use that object instead of repeating asset paths. Event photos/opponent logos live in `public/ceu-img/events/` and are referenced from the `events` collection with `ceu-img/...` paths.
- `src/styles.css` owns global resets/fonts and imports `src/app/app.css`, which owns the design system, responsive layout, and section styles. This stylesheet is intentionally global (component styles have a tight budget — see below).

## Build/compiler constraints

- `angular.json` uses `@angular/build:application`, copies `public/`, hashes production output, and enforces budgets: 500 kB warning / 1 MB error (initial), 4 kB warning / 8 kB error (per-component style). Keep new styles in the global stylesheet rather than blowing the component budget.
- `tsconfig.json` targets ES2022 with strict Angular injection/input checks plus `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`. Fix types rather than widening casts to bypass these.
- Root integration tests (`app.spec.ts`) use Angular `TestBed` with `provideHttpClient()` + `provideHttpClientTesting()`; flush the exact relative `data/team-data.json` request and call `http.verify()` in teardown. Follow this pattern for language/content-change tests.
- No coverage threshold, E2E suite, security scanner, or lint script exists — don't describe any as present.

## Conventions

- Use Angular control flow (`@if`, `@for`, `@switch`) as the current templates do; track repeated records with a stable ID or other stable identity.
- Content maintenance (schedule, upcoming event, roster, results, recent events, recruitment, contact, editorial copy) belongs in `public/data/team-data.json`, not Angular code. Preserve stable IDs, ISO `YYYY-MM-DD` dates, the typed enums (`practice`/`pickup`/`match`, `win`/`loss`/`draw`), complete URLs, and both `vi`/`en` values.
- Keep public data privacy-safe: no private phone numbers, home addresses, personal accounts, or non-consented player photos. Use the documented empty-photo behavior when no public photo is approved.
- Reusable SVG contact marks go in the `contact-icon` component rather than adding an icon dependency for a one-off footer link.
- External links use full `https://` or `mailto:` URLs; `target="_blank"` pairs with `rel="noopener"`.
- Preserve the black/yellow/gold visual system, visible focus states, semantic landmarks, meaningful alt text, keyboard operation, and `prefers-reduced-motion` behavior when touching UI.
- `site.sampleNotice` marks the content as sample data — remove/replace only after the team approves public copy, roster, links, and photo permissions (see `implementation_notes.md` for outstanding content items).
- Update `README.md`, `docs/content-guide.md`, or `implementation_notes.md` when changing the volunteer data workflow, asset filenames, deployment behavior, or other repository-facing conventions. The deeper evidence-backed reference set lives in `docs/codebase/` (start with `ARCHITECTURE.md`, `CONVENTIONS.md`, `CONCERNS.md` for cross-module tasks) — keep it aligned with source/config changes.

## Deployment

`.github/workflows/deploy.yml` runs on Node 22 with `npm ci`, builds with `npm run build -- --base-href "/CEULandingPage/"`, and uploads `dist/ceu-landing-page/browser` to GitHub Pages. Update `--base-href` if the repository name or a custom domain changes.

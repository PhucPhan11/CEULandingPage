# CLAUDE.md

CEU (CanTho Entixie Ultimate) landing page: a static, bilingual (vi/en) Angular 22 SPA that renders
`public/data/team-data.json` and deploys to GitHub Pages under `/CEULandingPage/`.

**Source of truth:** `.github/copilot-instructions.md` holds the team's full architecture and
convention rules (shared with Copilot). Read it before any non-trivial code change. This file only
adds verified commands, gotchas, and pointers. Put team-wide rule changes in the Copilot file, not here.

## Commands

Commands come from `package.json` and `.github/workflows/deploy.yml`. Status is from the last verification run.

| Task | Command | Status |
|---|---|---|
| Install (CI) | `npm ci` | not run here (installs deps; ask first) |
| Install (local) | `npm install` | not run here (installs deps; ask first) |
| Dev server | `npm start` → http://localhost:4200/ | ✅ |
| Production build | `npm run build` | ✅ |
| Deploy-equivalent build | `npx ng build --base-href /CEULandingPage/` | ✅ (see Git Bash note) |
| CI build (exact) | `npm run build -- --base-href "/CEULandingPage/"` | same as above |
| All tests | `npm test -- --watch=false` | ✅ 1 file, 2 tests |
| Single spec | `npx ng test --watch=false --include src/app/app.spec.ts` | ✅ |
| Dev watch build | `npm run watch` | ✅ |
| Lint | none. There's no lint script or ESLint config. | n/a |
| Format check | `npx prettier --check <files you touched>` | ❌ repo-wide: 28 files unformatted |

- Prettier (`.prettierrc`) isn't enforced, and most of `src/` isn't formatted with it. Run it only on
  files you changed and never `prettier --write` the whole repo, because the diff would bury the real change.
- **Git Bash on Windows** rewrites `/CEULandingPage/` into `C:/Program Files/Git/CEULandingPage/`.
  Run base-href builds from PowerShell, or prefix them with `MSYS_NO_PATHCONV=1`. Check the result with
  `<base href="/CEULandingPage/">` in `dist/ceu-landing-page/browser/index.html`.
- CI builds PRs and deploys `main`, but **never runs tests**. Run `npm test -- --watch=false` yourself
  before calling a change done.

## Environment gotchas

- CI uses Node 22. A newer local Node (for example 23) works but isn't what CI runs, so treat Node 22 as the target.
- The app is **zoneless** (no `zone.js` dependency). In tests, `await fixture.whenStable()` and then
  `fixture.detectChanges()` before asserting on the DOM.
- The test runner is **Vitest + jsdom** through `@angular/build:unit-test`, not Karma. The
  "ng test" entry in `.vscode/launch.json` (port 9876) is stale Karma config, so don't rely on it.
- The build fails on budgets: 1 MB initial, **8 kB per component stylesheet** (`angular.json`).

## Architecture boundaries

- `src/app/app.ts` only orchestrates (data load, `language` signal, loading/error state, `<html lang>`).
  Put new sections in `src/app/components/<section-name>/`, register them in `App`, and compose them in `src/app/app.html`.
- `TeamDataService` must fetch the **relative** `data/team-data.json`. A root-absolute `/data/...` breaks
  GitHub Pages.
- When you change `src/app/models/team-data.ts`, update the validator in
  `src/app/services/team-data.service.ts` and the `sampleTeamData` fixture in `src/app/app.spec.ts` in the same change.
- Content belongs in `public/data/team-data.json`, not in Angular code (see `.claude/rules/content-data.md`).
- Put styles in global `src/app/app.css` (imported by `src/styles.css`), not in component stylesheets. The budget above is why.
- Reuse these helpers rather than duplicating them: `LocalizedTextPipe` (`src/app/shared/localized-text.pipe.ts`) for
  `{ vi, en }` text, `src/app/shared/content-labels.ts` for schedule/result labels,
  `TEAM_BRAND_ASSETS` (`src/app/shared/brand-assets.ts`) for brand/jersey image paths, and the `contact-icon`
  component for SVG marks. Don't add an icon dependency.
- Don't show JSON order as display order for events: `RecentEventsComponent` sorts by ISO `date`, newest first.

## Match existing code patterns

- Standalone components only, never an NgModule. Section components declare `standalone: true`.
- Use decorator `@Input()` / `@Output() EventEmitter` like the existing sections. Don't introduce signal
  `input()`/`output()` piecemeal. Migrate only when the task asks for it.
- Signals live in `App`. Data loading is RxJS `HttpClient` + `map(validate)`. Use `inject()` for DI.
- Templates use `@if`/`@for`/`@switch`. Every `@for` tracks a stable id (`track item.id`), not `$index`,
  when one exists.
- Use relative imports. There are no path aliases or barrel files.
- Routing is intentionally unused (`src/app/app.routes.ts` is empty and not provided). Don't add routes.
- Off-site links use full `https://`/`mailto:` URLs, and every `target="_blank"` carries `rel="noopener"`.
- Keep the black/yellow/gold palette, visible focus states, semantic landmarks, alt text, keyboard
  access, and `prefers-reduced-motion` handling.

## Testing

- `src/app/app.spec.ts` is the integration pattern: `provideHttpClient()` + `provideHttpClientTesting()`,
  `http.expectOne('data/team-data.json').flush(sampleTeamData)`, and `http.verify()` in `afterEach`.
- Add language/content assertions there, checking user-visible text in both languages.
- There's no coverage threshold, E2E suite, a11y automation, or security scanner. Don't claim one exists.

## Read when…

- Starting any non-trivial code change: `.github/copilot-instructions.md`
- Working across modules or on a risky change: `docs/codebase/ARCHITECTURE.md`, `docs/codebase/CONCERNS.md`
- Checking naming, imports, or error handling: `docs/codebase/CONVENTIONS.md`
- Writing or changing tests: `docs/codebase/TESTING.md`
- Editing `public/data/team-data.json` or images: `docs/content-guide.md` (the path rule loads automatically)
- Checking open launch items (sample copy, base path): `implementation_notes.md`

## Keep docs in sync

- Team-wide coding rule changed: update `.github/copilot-instructions.md` (Copilot and Claude both rely on it).
- Data contract, volunteer workflow, or asset filenames changed: update `docs/content-guide.md` and `README.md`.
- Deployment or base path changed: update `README.md` and the `--base-href` in `.github/workflows/deploy.yml`.
- Source or config structure changed: update the matching file in `docs/codebase/`.
- A milestone was finished or an open item added: update `implementation_notes.md`.

# Copilot instructions for CanTho Entixie Ultimate

## Commands

Use Node.js 22 and npm. The GitHub Actions workflow runs `npm ci` and deploys
the production build to GitHub Pages.

```bash
npm install
npm start
npm run build
npm run build -- --base-href "/CEULandingPage/"
npm test -- --watch=false
npm test -- --watch=false --include src/app/app.spec.ts
npm run watch
```

- `npm start` serves the app locally at `http://localhost:4200/`.
- The `--base-href` build is the deployment-equivalent command for this
  repository. Its Pages artifact is `dist/ceu-landing-page/browser`.
- The single-test command can be adapted by replacing the `--include` path
  with another `*.spec.ts` file.
- There is no npm lint script. Prettier is installed and configured in
  `.prettierrc`; TypeScript uses single quotes, two-space indentation, and
  Angular templates use the Angular Prettier parser.

## Repository map and data flow

- `src/main.ts` bootstraps the standalone `App` component with
  `src/app/app.config.ts`; `src/app/app.routes.ts` is intentionally empty
  because v1 has one page and no route-driven flow.
- `src/app/app.ts` is the only page-level coordinator. It injects
  `TeamDataService`, owns `language`, `data`, and loading/error signals, and
  passes typed slices of `TeamData` to section components.
- `src/app/components/<section-name>/` contains standalone presentation
  components. Keep section markup and behavior there instead of expanding
  `App`; reusable non-visual logic belongs in `src/app/shared/` or
  `src/app/services/`.
- `public/data/team-data.json` is the editable content source. `public/` is
  copied verbatim by `angular.json`, so asset references must be relative to
  the deployed base path.
- `src/styles.css` owns global resets/fonts and imports the 1,878-line
  `src/app/app.css`, which owns the shared design system, responsive layout,
  and section styles.

## Architecture

- This is a static, client-rendered Angular 22 single-page application. There
  is no backend, authentication, private admin dashboard, or route-driven page
  flow in v1.
- `src/main.ts` bootstraps the standalone `App` component with
  `src/app/app.config.ts`, which provides the browser error listener and
  `HttpClient`.
- `src/app/app.ts` is the page orchestrator. It owns the language signal,
  loading/ready/error state, document language updates, and the
  `TeamDataService` subscription. Keep section-specific markup and behavior
  out of this class.
- `src/app/app.html` composes the page in this order: header, hero, content
  status, about, jersey gallery, schedule, roster, results, recent events,
  recruitment, and footer. Sections under `src/app/components/` are standalone
  components with
  typed inputs; the header emits language changes back to `App`.
- `TeamDataService` loads the relative URL `data/team-data.json` and performs
  the runtime shape checks. Angular copies `public/` into the build output, so
  do not change this data URL to `/data/team-data.json`; the root-absolute form
  breaks the `/CEULandingPage/` GitHub Pages deployment.
- `src/app/models/team-data.ts` is the shared data contract. Editable content
  is grouped in the JSON under `site`, `schedule`, `roster`, `results`,
  `events`, `recruitment`, and `contact`. `site.introduction` is a non-empty array of
  bilingual paragraphs; the first item is the club name and the remaining
  items are rendered in the About section. `site.values` contains the three
  bilingual CEU mission cards shown beneath that introduction.
- Bilingual copy uses `{ vi, en }` objects and is rendered through
  `LocalizedTextPipe`. Pass the active `Language` into section components and
  use the pipe instead of selecting translations ad hoc. `App` also updates
  `document.documentElement.lang`.
- Fixed visual assets live in `public/ceu-img/` and their paths are centralized
  in `src/app/shared/brand-assets.ts`. Use that object for the avatar,
  wordmark/background, and jersey images rather than repeating asset paths.
- Recent event photos, backgrounds, and opponent/event logos live in
  `public/ceu-img/events/` and are referenced by the `events` data collection
  with `ceu-img/...` paths. Host clubs use `host` and `hostLogo`; multi-day
  events use `endDate` and `endDateLabel`; poster-style images can use
  `fit: "contain"`. An event `background` is rendered as the first gallery
  image. Recent events are sorted newest first by their ISO `date` in
  `RecentEventsComponent`, so JSON array order is not the display order.
- Global layout, responsive behavior, design tokens, and section styles are
  imported from `src/styles.css`, which imports `src/app/app.css`. The large
  stylesheet is intentionally global because Angular's component-style budget
  would otherwise be exceeded.
- The GitHub Pages workflow in `.github/workflows/deploy.yml` uses Node 22,
  `npm ci`, `npm run build -- --base-href "/CEULandingPage/"`, and uploads
  `dist/ceu-landing-page/browser`.

## Build, compiler, and test constraints

- `angular.json` uses `@angular/build:application`, copies the `public/`
  directory, hashes production output, and enforces a 500 kB initial warning /
  1 MB initial error budget plus a 4 kB warning / 8 kB error component-style
  budget.
- `tsconfig.json` targets ES2022 and enables strict Angular injection/input
  checks plus `noImplicitReturns`, `noFallthroughCasesInSwitch`, and
  `noPropertyAccessFromIndexSignature`. Keep changes type-safe rather than
  bypassing these checks with broad casts.
- Root integration tests use Angular `TestBed`, `provideHttpClient()`, and
  `provideHttpClientTesting()`. Flush the exact relative
  `data/team-data.json` request and call `http.verify()` in teardown.
- There is no configured coverage threshold, E2E suite, security scanner, or
  lint script. Do not describe those checks as existing unless the repository
  adds them explicitly.

## Repository conventions

- Add new page sections as standalone components under
  `src/app/components/<section-name>/` with a TypeScript file and an Angular
  template. Register the component in `App` and compose it in `app.html`;
  do not grow the root template into a monolith.
- Use Angular control flow (`@if`, `@for`, and `@switch`) used by the current
  templates. Track repeated records with a stable ID or another stable
  identity.
- Keep schedule, roster, result, contact, and editorial updates in
  `public/data/team-data.json`; volunteers should not need to edit Angular
  code for normal content maintenance. Preserve stable IDs, ISO `YYYY-MM-DD`
  dates, typed enum values (`practice`/`pickup`/`match`, `win`/`loss`/`draw`), complete
  URLs, and both `vi` and `en` values for public copy.
- Keep public data privacy-safe: do not add private phone numbers, home
  addresses, personal accounts, or player photos without consent. Use the
  documented empty-photo behavior when no public photo is approved.
- Put reusable bilingual schedule/result labels in
  `src/app/shared/content-labels.ts`; put reusable SVG contact marks in the
  `contact-icon` component instead of adding an icon dependency for one-off
  footer links.
- Preserve the existing black/yellow/gold visual system and its responsive
  behavior. Add shared tokens and layout rules to `src/app/app.css`; keep
  component styles small enough for the Angular style budget. Maintain visible
  focus states, semantic landmarks, meaningful image alt text, keyboard
  operation, and `prefers-reduced-motion` behavior when changing UI.
- Root tests use Angular `TestBed` with `provideHttpClient()` and
  `provideHttpClientTesting()`. Flush the expected relative
  `data/team-data.json` request, call `http.verify()` in teardown, and use
  the existing `App` integration test pattern for language/content changes.
- The supplied event media includes several multi-megabyte PNG/JPG files. Keep
  meaningful alt text and consent records, but consider responsive WebP/AVIF
  derivatives before adding more high-resolution assets.
- `TeamDataService` validates the JSON root, required collections, and core site
  fields, then casts the remaining structure to `TeamData`; changes to nested
  records should preserve the model and be covered by `app.spec.ts`.
- `site.sampleNotice` still states that the content is sample data. Remove or
  replace it only after the team approves the public copy, roster, links, and
  photo permissions.
- The evidence-backed codebase reference set is in `docs/codebase/`: start with
  `ARCHITECTURE.md`, `CONVENTIONS.md`, and `CONCERNS.md` when a task crosses
  module or workflow boundaries.
- Update `README.md`, `docs/content-guide.md`, or
  `implementation_notes.md` when changing the volunteer data workflow,
  asset filenames, deployment behavior, or other repository-facing
  conventions.

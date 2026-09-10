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
  status, about, jersey gallery, schedule, roster, results, recruitment, and
  footer. Sections under `src/app/components/` are standalone components with
  typed inputs; the header emits language changes back to `App`.
- `TeamDataService` loads the relative URL `data/team-data.json` and performs
  the runtime shape checks. Angular copies `public/` into the build output, so
  do not change this data URL to `/data/team-data.json`; the root-absolute form
  breaks the `/CEULandingPage/` GitHub Pages deployment.
- `src/app/models/team-data.ts` is the shared data contract. Editable content
  is grouped in the JSON under `site`, `schedule`, `roster`, `results`,
  `recruitment`, and `contact`. `site.introduction` is a non-empty array of
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
- Global layout, responsive behavior, design tokens, and section styles are
  imported from `src/styles.css`, which imports `src/app/app.css`. The large
  stylesheet is intentionally global because Angular's component-style budget
  would otherwise be exceeded.
- The GitHub Pages workflow in `.github/workflows/deploy.yml` uses Node 22,
  `npm ci`, `npm run build -- --base-href "/CEULandingPage/"`, and uploads
  `dist/ceu-landing-page/browser`.

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
- Update `README.md`, `docs/content-guide.md`, or
  `implementation_notes.md` when changing the volunteer data workflow,
  asset filenames, deployment behavior, or other repository-facing
  conventions.

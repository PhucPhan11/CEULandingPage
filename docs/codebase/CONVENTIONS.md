# Coding Conventions

## Core Sections (Required)

### 1) Naming Rules

| Item | Rule | Example | Evidence |
|------|------|---------|----------|
| Files | kebab-case feature directories and Angular suffixes | `recent-events.component.ts` | `src/app/components/recent-events/*` |
| Functions/methods | camelCase; visibility is often explicit with `protected` or `private` | `setLanguage`, `loadData` | `src/app/app.ts` |
| Types/interfaces | PascalCase | `TeamData`, `RecentEventImage` | `src/app/models/team-data.ts` |
| Constants | uppercase descriptive names for shared immutable maps | `TEAM_BRAND_ASSETS`, `RESULT_OUTCOME_LABELS` | `src/app/shared/*` |
| Content IDs | stable lower-case hyphenated strings | `seacup5-2026`, `training-friday` | `public/data/team-data.json` |
| Component selectors | `app-` plus kebab-case | `app-recent-events` | `src/app/components/recent-events/recent-events.component.ts` |

### 2) Formatting and Linting

- Formatter: Prettier 3 with 100-column output, single quotes, and the Angular
  parser for HTML (`.prettierrc`).
- Editor defaults: two spaces, spaces not tabs, final newline, and trimmed
  trailing whitespace (`.editorconfig`).
- Linter: no npm lint script or lint configuration was found (`package.json`,
  repository scan).
- TypeScript/compiler rules: ES2022 target, isolated modules, strict Angular
  injection/input checks, `noImplicitReturns`, `noFallthroughCasesInSwitch`,
  and `noPropertyAccessFromIndexSignature` (`tsconfig.json`).
- Run commands: `npm run build`, `npm test -- --watch=false`; formatting is
  configured but `[TODO]` no repository check command is defined.

### 3) Import and Module Conventions

- Use relative imports from the current feature/shared boundary; no path aliases
  or barrel exports are configured.
- Angular imports appear first, followed by local models, shared utilities, and
  sibling components as needed.
- Prefer standalone components with explicit `imports` arrays; do not introduce
  an NgModule for a new section.
- Reuse `LocalizedTextPipe`, `content-labels.ts`, and `brand-assets.ts` rather
  than selecting translations or repeating asset paths in each component.

### 4) Error and Logging Conventions

- `TeamDataService` throws descriptive `Error` instances when the root JSON,
  required collections, or core site fields are invalid.
- `App` handles the observable error, logs it with `console.error`, sets a
  bilingual user-facing error message, and changes the state to `error`.
- Bootstrap failures are logged by the `catch` in `src/main.ts`.
- No logging library, structured log schema, or secret-redaction utility is
  configured. Public data must remain privacy-safe according to
  `docs/content-guide.md`.

### 5) Testing Conventions

- Test files are co-located and use the `*.spec.ts` suffix; the current root
  integration test is `src/app/app.spec.ts`.
- Configure Angular HTTP tests with `provideHttpClient()` and
  `provideHttpClientTesting()`.
- Flush the exact `data/team-data.json` request, call `fixture.whenStable()`
  before assertions, and call `http.verify()` in `afterEach`.
- Assert user-visible bilingual content, component structure, asset paths, and
  language switching rather than private implementation details.
- Coverage expectation: `[TODO]` no threshold or coverage command is configured.

### 6) Evidence

- `.prettierrc`
- `.editorconfig`
- `tsconfig.json`
- `src/app/app.ts`
- `src/app/services/team-data.service.ts`
- `src/app/app.spec.ts`

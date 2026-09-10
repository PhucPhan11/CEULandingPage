# Architecture

## Core Sections (Required)

### 1) Architectural Style

- Primary style: static, client-rendered Angular single-page composition using
  standalone presentation components and a small data-loading service.
- Why this classification: `App` composes section components, while
  `TeamDataService` loads one JSON document and the sections receive typed
  inputs (`src/app/app.html`, `src/app/services/team-data.service.ts`).
- Primary constraints:
  1. Public content is repository-managed JSON under `public/data/`.
  2. The data URL must remain relative because deployment uses a repository
     subpath base href.
  3. The app has no backend, authentication, database, or route-driven flow.

### 2) System Flow

```text
src/main.ts
  -> bootstrapApplication(App, appConfig)
  -> App.loadData()
  -> TeamDataService.load()
  -> GET data/team-data.json
  -> validate root/collections/site and upcomingEvent fields
  -> App signals and app.html
  -> standalone section components
  -> localized templates and static assets
```

1. `src/main.ts` bootstraps `App` with the providers in `app.config.ts`.
2. `App` calls `TeamDataService.load()` in its constructor and exposes loading,
   ready, or error state through signals.
3. `TeamDataService` requests the relative JSON URL and validates the object,
   required collections, core site fields, and the `upcomingEvent` CTA/content
   shape.
4. `app.html` passes typed data and the active language into standalone
   components; Angular copies `public/` assets into the build output.
5. `LocalizedTextPipe` selects `vi` or `en`; language changes also update the
   document root language in `App`.

### 3) Layer/Module Responsibilities

| Layer or module       | Owns                                                                   | Must not own                              | Evidence                                        |
| --------------------- | ---------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------- |
| Bootstrap/config      | Application bootstrap and root providers                               | Content or section state                  | `src/main.ts`, `src/app/app.config.ts`          |
| Root coordinator      | Data request lifecycle, language signal, error state, page composition | Detailed section markup                   | `src/app/app.ts`, `src/app/app.html`            |
| Data service          | Relative HTTP request and boundary validation                          | Rendering or translation                  | `src/app/services/team-data.service.ts`         |
| Section components    | Typed inputs and section templates                                     | Direct JSON loading or unrelated sections | `src/app/components/*`                          |
| Models                | TypeScript contracts                                                   | Runtime loading                           | `src/app/models/team-data.ts`                   |
| Shared utilities      | Translation pipe, reusable labels, asset paths                         | Page orchestration                        | `src/app/shared/*`                              |
| Public content/assets | Editable copy and media                                                | Application behavior                      | `public/data/team-data.json`, `public/ceu-img/` |

### 4) Reused Patterns

| Pattern                                | Where found                                                         | Why it exists                                                                            |
| -------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Standalone component composition       | `src/app/components/*`, `src/app/app.ts`                            | Keeps page sections independently maintainable                                           |
| Dependency injection with `inject()`   | `src/app/app.ts`, `src/app/services/team-data.service.ts`           | Uses Angular's provider system without a root module                                     |
| Signal-based root state                | `src/app/app.ts`                                                    | Represents loading, error, data, and language changes                                    |
| Shared localization pipe               | `src/app/shared/localized-text.pipe.ts`                             | Avoids ad hoc bilingual field selection                                                  |
| Shared labels and asset constants      | `src/app/shared/content-labels.ts`, `brand-assets.ts`               | Prevents repeated values and paths                                                       |
| Stable identity in control flow        | `src/app/components/*/*.html`                                       | `@for` blocks track IDs or stable asset paths                                            |
| Dedicated upcoming-event content block | `src/app/components/upcoming-event/*`, `public/data/team-data.json` | Keeps hosted-tournament promotion separate from weekly schedule and past-event galleries |
| Date sorting for recent events         | `src/app/components/recent-events/recent-events.component.ts`       | Displays newest events first without mutating JSON input                                 |

### 5) Known Architectural Risks

- The JSON validator checks selected root, site, and `upcomingEvent` fields
  before casting the rest to `TeamData`; malformed nested schedule, roster,
  result, or recent-event records can still reach templates.
- The page is intentionally static, so content edits require a repository
  change and a successful GitHub Pages build; there is no runtime admin flow.
- Shared styling is concentrated in a large global stylesheet to stay within
  Angular component-style budgets.

### 6) Evidence

- `src/main.ts`
- `src/app/app.config.ts`
- `src/app/app.ts`
- `src/app/app.html`
- `src/app/services/team-data.service.ts`
- `src/app/models/team-data.ts`
- `src/app/components/upcoming-event/upcoming-event.component.html`
- `src/app/shared/localized-text.pipe.ts`

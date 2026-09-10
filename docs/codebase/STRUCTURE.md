# Codebase Structure

## Core Sections (Required)

### 1) Top-Level Map

| Path                  | Purpose                                                                              | Evidence                                        |
| --------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `src/`                | Angular application source and global styles                                         | `angular.json`, `src/main.ts`                   |
| `src/app/`            | Root coordinator, data contract, services, shared utilities, and sections            | `src/app/app.ts`, `src/app/models/team-data.ts` |
| `src/app/components/` | Standalone page sections, including `upcoming-event`, plus the reusable contact icon | `src/app/app.ts`, `src/app/components/*`        |
| `src/app/models/`     | Shared TypeScript data contracts                                                     | `src/app/models/team-data.ts`                   |
| `src/app/services/`   | HTTP loading and runtime validation of team data                                     | `src/app/services/team-data.service.ts`         |
| `src/app/shared/`     | Localization, labels, and centralized brand asset paths                              | `src/app/shared/*`                              |
| `public/data/`        | Editable bilingual content JSON                                                      | `public/data/team-data.json`                    |
| `public/ceu-img/`     | Brand, jersey, event logos, backgrounds, and photos                                  | `public/ceu-img/*`                              |
| `docs/`               | Volunteer content guide and generated codebase reference docs                        | `docs/content-guide.md`, `docs/codebase/*`      |
| `.github/workflows/`  | GitHub Pages build and deployment workflow                                           | `.github/workflows/deploy.yml`                  |
| `dist/`               | Generated build output; do not use as source convention                              | `angular.json` output behavior                  |

### 2) Entry Points

- Main runtime entry: `src/main.ts`.
- Root component: `src/app/app.ts`, bootstrapped by `bootstrapApplication`.
- Secondary entry points: none; `src/app/app.routes.ts` exports an empty route
  list and there are no workers, CLIs, or backend services.
- Local scripts are selected through `package.json`; CI deployment is selected
  through `.github/workflows/deploy.yml`.
- The current root composition order places `app-upcoming-event` before
  `app-recent-events` so provisional hosted-tournament information appears
  ahead of the past-events gallery.

### 3) Module Boundaries

| Boundary                               | What belongs here                                                          | What must not be here                                              |
| -------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `src/main.ts` and `app.config.ts`      | Browser bootstrap and root providers                                       | Page markup or content records                                     |
| `src/app/app.ts` and `app.html`        | Loading state, language state, data orchestration, and section composition | Section-specific presentation logic                                |
| `src/app/components/<section>/`        | Standalone section inputs, templates, and local presentation behavior      | Direct edits to the JSON source or duplicated global design tokens |
| `src/app/services/`                    | HTTP access and boundary validation                                        | Visual rendering                                                   |
| `src/app/models/`                      | Shared interfaces and union types                                          | Runtime side effects                                               |
| `src/app/shared/`                      | Reusable pipes, labels, and asset constants                                | Page-specific markup                                               |
| `public/data/` and `public/ceu-img/`   | Volunteer-maintained content and static media                              | TypeScript application logic                                       |
| `src/styles.css` and `src/app/app.css` | Global reset, tokens, layout, responsive rules, and section styling        | Data loading or application state                                  |

### 4) Naming and Organization Rules

- Files and directories use kebab-case, for example
  `upcoming-event/upcoming-event.component.ts`.
- Angular components use the `<section>.component.ts` and
  `<section>.component.html` pair with `app-` selectors.
- Shared model types use PascalCase interfaces and union types, such as
  `TeamData`, `UpcomingEventContent`, `RecentEvent`, `Language`, and
  `ScheduleKind`.
- Imports are relative paths; no TypeScript path aliases or barrel exports are
  configured.

### 5) Evidence

- `angular.json`
- `src/main.ts`
- `src/app/app.ts`
- `src/app/app.html`
- `src/app/models/team-data.ts`
- `public/data/team-data.json`

# External Integrations

## Core Sections (Required)

### 1) Integration Inventory

| System | Type (API/DB/Queue/etc) | Purpose | Auth model | Criticality | Evidence |
|--------|-------------------------|---------|------------|-------------|----------|
| `public/data/team-data.json` | Static content resource | Supplies all editable team content | None | High | `src/app/services/team-data.service.ts`, `public/data/team-data.json` |
| Google Fonts | External CSS resource | Loads DM Sans and Space Grotesk | None | Low | `src/styles.css` |
| Google Maps URLs | Outbound browser links | Opens schedule venue maps | None; user browser follows URL | Low | `public/data/team-data.json`, `src/app/components/schedule/schedule.component.html` |
| Social/email links | Outbound browser links | Team contact and social presence | None | Medium | `public/data/team-data.json`, `src/app/components/site-footer/site-footer.component.html` |
| GitHub Actions + GitHub Pages | CI/CD and static hosting | Builds and publishes the site | GitHub workflow permissions | High | `.github/workflows/deploy.yml` |

No database, backend API, queue, authentication provider, analytics, or
monitoring service is present in the source or scan output.

### 2) Data Stores

| Store | Role | Access layer | Key risk | Evidence |
|-------|------|--------------|----------|----------|
| `public/data/team-data.json` | Canonical repository content | `TeamDataService` via Angular `HttpClient` | Invalid nested JSON can pass the shallow validator | `src/app/services/team-data.service.ts` |
| `public/` assets | Static images copied into the build | Angular CLI asset configuration | Large files increase page weight | `angular.json`, `public/ceu-img/events/*` |

### 3) Secrets and Credentials Handling

- Credential sources: none found; the app has no environment template and no
  environment-variable reads.
- Source search found no credential reads or API clients; public URLs and the
  team email are intentionally content data.
- Rotation/lifecycle notes: not applicable to current integrations.
- `[TODO]` Revisit this section if analytics, a CMS, or a private API is added.

### 4) Reliability and Failure Behavior

- Retry/backoff behavior: none; `HttpClient` performs one content request.
- Timeout policy: none configured in application code.
- Fallback behavior: the root app shows loading and bilingual error states when
  the JSON request or validation fails (`src/app/app.html`, `src/app/app.ts`).
- GitHub Actions cancels an older Pages run when a newer run for the same group
  starts (`.github/workflows/deploy.yml`).

### 5) Observability for Integrations

- Logging around external calls: the root app logs a load failure with
  `console.error`; bootstrap failures are also logged.
- Metrics/tracing coverage: none found.
- Missing visibility gaps: no client error reporting, uptime monitoring, build
  notification, or deployment health check is configured.

### 6) Evidence

- `src/app/services/team-data.service.ts`
- `src/app/app.ts`
- `src/styles.css`
- `src/app/components/schedule/schedule.component.html`
- `src/app/components/site-footer/site-footer.component.html`
- `.github/workflows/deploy.yml`

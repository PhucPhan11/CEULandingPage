# Codebase Concerns

## Core Sections (Required)

### 1) Top Risks (Prioritized)

| Severity | Concern                                                                   | Evidence                                                                                                                    | Impact                                                                                       | Suggested action                                                       |
| -------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| high     | Event and brand media includes multi-megabyte PNG/JPG files               | `public/ceu-img/events/*`; scan measured the largest file at about 12.5 MB                                                  | Slow first view, higher GitHub Pages bandwidth, and poor mobile loading                      | Create responsive WebP/AVIF derivatives and retain meaningful alt text |
| medium   | Production deployment builds but does not run tests                       | `.github/workflows/deploy.yml` has build/upload steps; `package.json` defines `test` separately                             | A regression can deploy if local/PR checks are skipped                                       | Add a test step to CI if the team wants deployment-gated tests         |
| medium   | JSON validation is still selective                                        | `src/app/services/team-data.service.ts` validates selected root, site, and `upcomingEvent` fields, then casts to `TeamData` | Malformed nested schedule, roster, result, or recent-event records can fail during rendering | Add nested guards or a build-time schema check                         |
| low      | No lint, coverage, E2E, security scan, or visual regression configuration | `package.json`, repository scan                                                                                             | Quality and accessibility regressions rely on manual review and the small integration suite  | Decide which checks are worth the maintenance cost                     |

### 2) Technical Debt

| Debt item                                    | Why it exists                                                                        | Where                                                  | Risk if ignored                                               | Suggested fix                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Global stylesheet is large                   | Shared layout/tokens avoid Angular component-style budget failures                   | `src/app/app.css`                                      | Changes can have broad selectors and become harder to isolate | Keep section boundaries clear; split only with a budget-safe styling plan                   |
| Content remains partly sample or provisional | `site.sampleNotice` is still live and the hosted November event is still provisional | `public/data/team-data.json`, `docs/content-guide.md`  | Sample or tentative copy could be published unintentionally   | Remove or replace `site.sampleNotice` and finalize the November event details before launch |
| Event JSON relies on media path discipline   | Static assets are referenced by hand-maintained relative strings                     | `public/data/team-data.json`, `public/ceu-img/events/` | Typos produce broken images after deployment                  | Add build-time asset/path validation if the collection grows                                |

### 3) Security Concerns

| Risk                                                     | OWASP category (if applicable)  | Evidence                                                                                                                                                                        | Current mitigation                                              | Gap                                                                           |
| -------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Unapproved public roster/photos or personal contact data | N/A; privacy/content governance | `docs/content-guide.md`, `public/data/team-data.json`                                                                                                                           | Documentation requires consent and privacy-safe public data     | No automated consent or PII check                                             |
| Outbound link destination changes                        | N/A                             | `src/app/components/site-footer/site-footer.component.html`, `src/app/components/schedule/schedule.component.html`, `src/app/components/recruitment/recruitment.component.html` | Existing off-site links open in a new tab with `rel="noopener"` | Link ownership/review remains manual                                          |
| Missing security automation                              | N/A                             | Scan found no security configuration                                                                                                                                            | Static app has no backend/auth attack surface                   | No dependency audit, headers policy, or automated security scan is configured |

### 4) Performance and Scaling Concerns

| Concern                                  | Evidence                     | Current symptom                                            | Scaling risk                                               | Suggested improvement                                                   |
| ---------------------------------------- | ---------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| Large event images                       | `public/ceu-img/events/*`    | Lazy loading delays requests but does not reduce file size | More events increase repository and page payload weight    | Generate compressed responsive variants                                 |
| Static JSON grows with editorial history | `public/data/team-data.json` | One document is fetched before rendering content           | Large roster/event history increases initial data transfer | Keep only useful public history or split content only when needed       |
| External font stylesheet                 | `src/styles.css`             | Fonts are requested from Google Fonts                      | Rendering depends on an external resource                  | Add a deliberate fallback/self-hosting decision if availability matters |

### 5) Fragile/High-Churn Areas

| Area                                                          | Why fragile                                                 | Churn signal                            | Safe change strategy                                                 |
| ------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| `public/data/team-data.json`                                  | Volunteer-edited contract drives every section              | Highest-churn content file in the scan  | Preserve IDs, enums, ISO dates, bilingual fields, and validate build |
| `src/app/app.css`                                             | Global selectors and responsive rules affect the whole page | High churn in a large single stylesheet | Make narrow section-scoped changes and check desktop/mobile behavior |
| `src/app/app.spec.ts`                                         | Root integration fixture must mirror the data contract      | High churn with each content feature    | Update fixture/assertions together and keep `http.verify()`          |
| `docs/content-guide.md` and `.github/copilot-instructions.md` | They define volunteer/agent workflows                       | High churn in recent history            | Update documentation with every contract or deployment change        |

### 6) `[ASK USER]` Questions

1. [ASK USER] Should the team approve an image optimization pass before adding
   more high-resolution event media?
2. [ASK USER] Should GitHub Actions run `npm test -- --watch=false` before
   uploading the Pages artifact?
3. [ASK USER] Which remaining sample or provisional records, roster entries,
   and November hosted-event details are approved for public launch?
4. [ASK USER] Are all supplied event photos approved for public publication?
5. [ASK USER] Will the site remain at `/CEULandingPage/`, or should a custom
   domain/base path be planned?

### 7) Evidence

- `public/ceu-img/events/`
- `public/data/team-data.json`
- `src/app/services/team-data.service.ts`
- `src/app/app.css`
- `src/app/app.spec.ts`
- `.github/workflows/deploy.yml`
- `package.json`
- `docs/content-guide.md`

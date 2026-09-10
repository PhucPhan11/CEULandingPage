# CanTho Entixie Ultimate

A bilingual, data-driven landing page for CanTho Entixie Ultimate, a local
Ultimate Frisbee team in Can Tho, Vietnam.

The site is intentionally static in v1. It presents the team publicly and lets
volunteers maintain schedule, roster, results, and contact copy through one
documented JSON file. It does not contain a private admin dashboard or a
backend.

## Local development

Install dependencies and start the Angular development server:

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The app reloads when source or data files change.

## Content updates

Edit [`public/data/team-data.json`](public/data/team-data.json) for public
content. The field rules and copy/paste examples are in
[`docs/content-guide.md`](docs/content-guide.md).

For a safe update:

1. Edit only the relevant data record.
2. Keep Vietnamese and English values in their matching `vi` and `en` fields.
3. Check names, dates, scores, map links, and photo consent.
4. Open a pull request when possible.
5. Confirm the build passes before publishing.

## Build and test

```bash
npm run build
npm test -- --watch=false
```

The production build is emitted to `dist/ceu-landing-page/browser`.

## Architecture

The root `App` component only coordinates the data request, loading/error
state, and active language. Page sections are standalone components under
`src/app/components/`:

- `site-header`
- `hero`
- `about`
- `jersey-gallery`
- `schedule`
- `roster`
- `results`
- `recent-events`
- `recruitment`
- `site-footer`

`src/app/shared/localized-text.pipe.ts` handles bilingual text selection, while
`src/app/shared/content-labels.ts` owns shared schedule/result labels. The
editable content contract remains in `src/app/models/team-data.ts` and is loaded
by `src/app/services/team-data.service.ts`. Fixed brand imagery, including the
three jersey images, is centralized in `src/app/shared/brand-assets.ts`.
Event photos and opponent logos are maintained in `public/ceu-img/events/` and
referenced by the `events` data collection.

## Codebase reference

The evidence-backed repository map, architecture notes, conventions,
integration inventory, testing patterns, and maintenance concerns are in
[`docs/codebase/`](docs/codebase/). Keep those documents aligned with source
and configuration changes that affect future contributors or coding agents.

## Deployment

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds pull requests and deploys pushes to `main` through GitHub Pages. The
current repository path is configured as `/CEULandingPage/`; update the
`--base-href` value if the repository name or custom domain changes.

In the repository settings, set **Pages > Build and deployment > Source** to
**GitHub Actions**. The site should be published at the repository's GitHub
Pages URL after the first successful deployment.

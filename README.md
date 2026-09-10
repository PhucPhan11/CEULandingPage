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

## Deployment

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds pull requests and deploys pushes to `main` through GitHub Pages. The
current repository path is configured as `/CEULandingPage/`; update the
`--base-href` value if the repository name or custom domain changes.

In the repository settings, set **Pages > Build and deployment > Source** to
**GitHub Actions**. The site should be published at the repository's GitHub
Pages URL after the first successful deployment.

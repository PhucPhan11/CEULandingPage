# Implementation notes

## Current milestone

- [x] Replaced the generated Angular welcome screen with the Entixie single-page layout.
- [x] Added bilingual language switching with Vietnamese as the default.
- [x] Added the local JSON data contract and runtime validation service.
- [x] Added data-driven hero, about, schedule, roster, results, recruitment, and footer sections.
- [x] Added responsive styling, focus states, reduced-motion behavior, and empty/error/loading states.
- [x] Extracted the page into standalone header, hero, about, schedule, roster, results, recruitment, and footer components.
- [x] Centralized bilingual text rendering and schedule/result labels in shared utilities.
- [x] Reduced the root `App` component to orchestration, language state, and data loading.
- [x] Integrated the supplied avatar and wordmark background through a shared brand-assets configuration.
- [x] Set the supplied avatar image as the browser favicon and touch icon.
- [x] Added reusable email, Instagram, Facebook, and YouTube icons to the footer contact links.
- [x] Updated the design tokens and major surfaces to the jersey-inspired black, yellow, and gold palette.
- [x] Added content maintenance documentation and GitHub Pages deployment workflow.
- [x] Verified the production build, the `/CEULandingPage/` base-href build, and two focused Angular tests.
- [x] Made the data request relative to the base href so GitHub Pages can serve `team-data.json` from the repository subpath.
- [ ] Replace sample content with approved team copy, player data, photos, schedule, results, and contact links.
- [ ] Confirm the final GitHub Pages URL/base path and custom-domain decision.

## Content handoff

The current `public/data/team-data.json` intentionally contains sample content.
Before launch, a team maintainer should follow `docs/content-guide.md`, replace
the sample notice and placeholder contact/social URLs, and confirm public roster
and photo consent.

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
- [x] Added a responsive bilingual jersey gallery for `black.png`, `blackAndYellow.png`, and `yellow.png`, with accessible captions and navigation links.
- [x] Updated the bilingual team introduction with the supplied Christian sports mission statement.
- [x] Added the CEU history and community introduction in Vietnamese and English to the data-driven About section.
- [x] Added the bilingual CEU mission block for camaraderie, physical training, and Christian sports.
- [x] Updated recurring club activities to Friday Training and month-end Friday Pick-up at the supplied fields.
- [x] Added the official Google Maps links and supplied addresses for both recurring activity venues.
- [x] Added the Recent Events section with the Thu Duc friendly match logo and two supplied match photos.
- [x] Added the Southwest Hat 2024 event with its logo, background, and supplied event photo.
- [x] Added the online LOI CHOI RUN event for 15/07/2026–09/08/2026 with four supplied images.
- [x] Added the SEACUP5 event hosted by NTSEA Ultimate Club with both logos and two supplied team photos.
- [x] Sorted recent events newest first by their ISO event date.
- [x] Matched the Southwest Hat gallery to the friendly-match layout with two images in one desktop row.
- [x] Improved responsive hero headline wrapping and widened the tablet copy measure to avoid an orphaned final word.
- [x] Updated the header brand block to display CAN THO ENTIXIE / ULTIMATE.
- [x] Scanned the repository and expanded `.github/copilot-instructions.md` with verified architecture, data-flow, build-budget, testing, and maintenance guidance.
- [x] Added the seven evidence-backed reference documents under `docs/codebase/`.
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

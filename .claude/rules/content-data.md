---
paths:
  - "public/data/**"
  - "public/ceu-img/**"
---

# Content data and media

Read `docs/content-guide.md` (the volunteer source of truth) before editing these files. Key rules:

- Keep existing `id` values stable, and make new ones unique, lowercase, and hyphenated.
- Dates use ISO `YYYY-MM-DD`. Human-readable text goes in the separate `dateLabel`.
- Use only the typed enums: `kind` is `practice`/`pickup`/`match`, `outcome` is `win`/`loss`/`draw`,
  social `icon` is `instagram`/`facebook`/`youtube`, and roster `accent` is `green`/`orange`/`blue`/`yellow`.
- Every public text field needs both `vi` and `en`.
- `site.introduction[0]` is the club name. The remaining items render in About.
- Set `upcomingEvent.buttonLabel` and `buttonUrl` together or not at all.
- Events: `host`/`hostLogo` names the organizing club, `endDate`/`endDateLabel` covers multi-day events,
  `fit: "contain"` keeps posters whole, and `background` renders as the first gallery image.
- Put event media in `public/ceu-img/events/` and reference it as `ceu-img/...` with no leading slash.
- Privacy: never add private phone numbers, home addresses, personal accounts, or photos without
  consent. When no approved photo exists, leave `photo` empty so the site falls back to initials.
- Don't remove `site.sampleNotice` until the team approves all public copy, roster, links, and photos.
- Event images are already multi-MB. Prefer compressed or resized files over adding more large originals.
- Build and tests don't load the real JSON (the spec flushes a fixture). After editing, check the syntax
  with `node -e "JSON.parse(require('fs').readFileSync('public/data/team-data.json','utf8'))"`, then
  run `npm start` and load the page. `TeamDataService` only rejects a malformed root/site/upcoming-event
  shape at runtime, and bad nested records fail during rendering.

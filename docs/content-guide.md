# Entixie content guide

The public site reads its content from `public/data/team-data.json`. Volunteers can
update that file without changing Angular code. Every update is published after the
change is merged and the GitHub Pages build completes; this is not a real-time admin
system.

## Recommended update workflow

1. Open `public/data/team-data.json` in the GitHub web editor or a local editor.
2. Change only the records you need and keep the surrounding JSON punctuation intact.
3. Keep Vietnamese text in `vi` and English text in `en`.
4. Open a pull request when possible so another teammate can check names, dates,
   scores, links, and photo consent before publishing.
5. Confirm the production build succeeds before treating the update as public.

## Data rules

- Dates use `YYYY-MM-DD`, for example `2026-09-12`, so the site can sort and
  expose them as machine-readable `<time>` values.
- Times use the local Can Tho time zone in a human-readable 24-hour format.
- `kind` must be `practice`, `pickup`, or `match`.
- Results use numeric `teamScore` and `opponentScore` values and an `outcome` of
  `win`, `loss`, or `draw`.
- Recent events use `date` in `YYYY-MM-DD`, a bilingual `title`, an opponent
  name/logo path, and image entries with bilingual alt text.
- Use stable, unique `id` values for schedule, roster, and result entries.
- Keep location addresses and map links public and safe to share.
- Use an empty `photo` value or omit the field when a player has no approved
  public photo. The site falls back to initials.
- Do not add private phone numbers, home addresses, personal accounts, or photos
  without the person's permission.
- External links should use complete `https://` URLs. Email links use the
  `mailto:` scheme.
- Social entries must include an icon value of `instagram`, `facebook`, or
  `youtube` so the footer can render the matching platform mark.

## Editing the team introduction

The `site.introduction` array powers the About section. Keep the first item as
the public club name and use the remaining items for the bilingual introduction
paragraphs. Every item must include both `vi` and `en` values.

```json
"introduction": [
  {
    "vi": "CANTHO ENTIXIE ULTIMATE CLUB (CEU)",
    "en": "CANTHO ENTIXIE ULTIMATE CLUB (CEU)"
  },
  {
    "vi": "Đoạn giới thiệu bằng tiếng Việt.",
    "en": "The English introduction paragraph."
  }
]
```

The `site.values` array powers the three CEU mission cards beneath the team
introduction. Keep the order as camaraderie, physical training, and Christian
sports spirit unless the team intentionally changes the mission structure.
Each card needs a bilingual `title` and `description`, plus its display `icon`.

## Adding a recent event

Add records to the top-level `events` array. Store event photos and opponent
logos under `public/ceu-img/events/`, then reference them with paths beginning
with `ceu-img/`. Keep event image alt text bilingual and avoid publishing
photos without the required consent.

The event card is intended for match memories and photo galleries; keep
scorelines in the separate `results` array when a result is available.

## Adding a schedule item

Copy an existing item in the `schedule` array and update:

```json
{
  "id": "practice-04",
  "date": "2026-10-03",
  "dateLabel": {
    "vi": "Thứ Bảy, 3 tháng 10",
    "en": "Saturday, October 3"
  },
  "time": "16:30 - 18:30",
  "kind": "practice",
  "title": {
    "vi": "Buổi tập mở",
    "en": "Open practice"
  },
  "location": {
    "vi": "Tên sân",
    "en": "Field name"
  },
  "address": {
    "vi": "Địa chỉ",
    "en": "Address"
  },
  "mapUrl": "https://maps.google.com/?q=...",
  "note": {
    "vi": "Ghi chú cho đồng đội.",
    "en": "A note for teammates."
  }
}
```

Use `opponent` for a match and omit it for a practice. Put the newest upcoming
event first so the hero and schedule section lead with the most useful update.
For recurring activities, use the next occurrence as the machine-readable
`date`, describe the recurrence in `dateLabel`, and repeat the time pattern in
the optional `note`.

## Adding a result

Copy an existing item in the `results` array. Enter the team's score in
`teamScore`, the opponent's score in `opponentScore`, and use a short
`highlight` to capture the story of the game. Keep newest results first.

## Editing the roster

Each roster entry should contain the public display name, number, role, short
bilingual bio, initials, and an accent color. The allowed accent values are
`green`, `orange`, `blue`, and `yellow`. Remove or omit a member's entry if the
team no longer has permission to display it.

## Brand assets

The shared brand assets live in `public/ceu-img/` and are referenced through
`src/app/shared/brand-assets.ts`:

- `avatar.png` is the square mark used in the site header, footer, and browser
  page icon.
- `background.png` is the horizontal Can Tho Entixie Ultimate wordmark used in
  the hero brand panel.
- `black.png`, `blackAndYellow.png`, and `yellow.png` are the jersey images
  shown in the responsive “Màu áo của Entixie / The Entixie kit” gallery.

Keep these files in the same folder when replacing them, preserve the filenames,
and check the result at both desktop and mobile widths. Jersey images are
centralized in `src/app/shared/brand-assets.ts`; update the matching filename
there if a replacement uses a different name. Replace or add player photos
separately in `public/assets/` only after receiving consent.

## Before launch

- Replace sample copy, placeholder email/social URLs, and sample player data.
- Confirm every name, score, venue, and contact link with the team.
- Confirm photo permission for every image added to `public/assets/` or
  `public/ceu-img/`.
- Keep the sample notice until all public content is approved, then remove it
  from the `site.sampleNotice` values.

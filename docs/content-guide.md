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
- `kind` must be `practice` or `match`.
- Results use numeric `teamScore` and `opponentScore` values and an `outcome` of
  `win`, `loss`, or `draw`.
- Use stable, unique `id` values for schedule, roster, and result entries.
- Keep location addresses and map links public and safe to share.
- Use an empty `photo` value or omit the field when a player has no approved
  public photo. The site falls back to initials.
- Do not add private phone numbers, home addresses, personal accounts, or photos
  without the person's permission.
- External links should use complete `https://` URLs. Email links use the
  `mailto:` scheme.

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

## Adding a result

Copy an existing item in the `results` array. Enter the team's score in
`teamScore`, the opponent's score in `opponentScore`, and use a short
`highlight` to capture the story of the game. Keep newest results first.

## Editing the roster

Each roster entry should contain the public display name, number, role, short
bilingual bio, initials, and an accent color. The allowed accent values are
`green`, `orange`, `blue`, and `yellow`. Remove or omit a member's entry if the
team no longer has permission to display it.

## Before launch

- Replace sample copy, placeholder email/social URLs, and sample player data.
- Confirm every name, score, venue, and contact link with the team.
- Confirm photo permission for every image added to `public/assets/`.
- Keep the sample notice until all public content is approved, then remove it
  from the `site.sampleNotice` values.

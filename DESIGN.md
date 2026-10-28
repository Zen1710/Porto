---
name: Naufal Rizky Ananda
description: A quiet, typographic résumé page for a full-stack developer, where identity and contact never leave the screen.
colors:
  paper: "oklch(19% 0.005 248)"
  ink: "oklch(95% 0.007 230)"
  muted: "oklch(76% 0.016 240)"
  subtle: "oklch(66% 0.02 240)"
  line: "oklch(29.5% 0.014 248)"
  wash: "oklch(22.4% 0.01 250)"
  accent: "oklch(72.4% 0.136 229)"
  accent-fill: "oklch(54.9% 0.127 242)"
  on-accent: "oklch(99.2% 0.003 240)"
  live: "oklch(72% 0.17 150)"
  danger: "oklch(72% 0.15 27)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.95
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.86rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "4px"
  chip: "6px"
  field: "8px"
  media: "10px"
  panel: "12px"
  pill: "9999px"
spacing:
  gutter-mobile: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "64px"
  column-gap: "80px"
  section-gap-mobile: "64px"
  section-gap-desktop: "96px"
  heading-to-content: "24px"
  field-gap: "20px"
  row: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "10px 14px"
  tech-chip:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "0.05em 0.4em"
  nav-link:
    textColor: "{colors.subtle}"
    typography: "{typography.label}"
    padding: "8px 0"
  nav-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "8px 0"
  text-link:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
---

# Design System: Naufal Rizky Ananda

## Overview

**Creative North Star: "The Résumé That Stays Put"**

This is a typographic résumé page, not a showcase. On desktop, identity and contact live in a sticky left column: the avatar, name, and role, the headline, the stack sentence, availability with the social links under it, the section nav, and the CV button. The content scrolls past on the right. Everything is near-white ink on Arknights black, with blue reserved for what can be used or is current, matching Naufal's GitHub profile (black `#121416`, deep blue `#0A78B4`, bright blue `#1FB5E9`). Hierarchy comes from Geist's weight and size alone. Depth comes from hairline rules. Nothing glows, floats, or fades in.

The page has a reading density, like a well-set CV. It uses generous line height, measures held between 60 and 68 characters, and section titles barely larger than body text. The headline is the only loud element. Blue is the only accent: links, the active nav rule, focus, the primary button, and the tech logos. A small green dot marks availability, and red appears only when a form field fails. Motion is limited to state transitions. The one signature move is the scrollspy: the active section's rule grows and its label darkens.

The world rejects the category default for portfolios: a centered hero above a grid of shadowed cards with gradient accents. It must not read as generic AI-generated UI.

**Key Characteristics:**
- Two columns on desktop with a sticky identity column. One column on mobile, in the same order, with no nav.
- Arknights black and blue: blue-tinted OKLCH neutrals plus one blue accent. Dark by default; light only when the visitor picks it with the toggle.
- Only Geist and Geist Mono. Sentence case everywhere. Hierarchy comes from weight and size.
- Hairline rules and tonal wash instead of shadows.
- Tech names are inline chips with monochrome brand logos, sitting on the text baseline.

## Colors

Arknights black and blue (changed at Naufal's request on 2026-10-28, to match the GitHub profile). Black paper, near-white ink, two cool grays, a hairline tone, a wash, and one blue accent. Two functional hues are kept out of the decorative palette. Values below are the dark theme, which is the default; the light theme remaps every token through `light-dark()`.

### Primary
- **Graphite Ink** (`ink`): headline, names, section titles, list-row titles, and body emphasis.
- **Originium Blue** (`accent`, bright blue `#1FB5E9` on dark, deep blue `#0A78B4` on light): text links, the active and hovered scrollspy rule, hover underlines, the focus outline, input focus strokes, the CV button's hover stroke, the text selection background, and the monochrome logos in tech chips and social links. It marks what can be used or what is current, never decoration.
- **Deep Blue Fill** (`accent-fill`, `#0A78B4` in both themes) with **On Accent** (`on-accent`, near-white, 4.8:1): the primary button only.

### Tertiary
- **Availability Green** (`live`): only the availability dot, both on the avatar and beside the availability line. It is never used for text, buttons, or decoration.
- **Error Red** (`danger`): only form validation. It colors invalid field borders and error messages. It is never used for emphasis.

### Neutral
- **Warm Paper** (`paper`): the page ground, input fills, the primary button's text, and the ring that separates the avatar dot from the photo.
- **Slate Muted** (`muted`): body copy, the role line, prose paragraphs, and list summaries.
- **Slate Subtle** (`subtle`): dates, meta lines, idle nav labels and rules, placeholders, and list markers.
- **Hairline** (`line`): every rule and border, including list dividers, input strokes, chip borders, the CV button stroke, link underlines at rest, and the scrollbar thumb.
- **Wash** (`wash`): chip and code-block fills, and the initials fallback for the avatar.

The site opens dark whatever the OS prefers; the theme toggle switches to light and the choice is saved. In light mode paper is a cool near-white (99.2%), ink is the GitHub black, the grays darken to stay at 5.8:1 and above, and `accent` becomes the deep blue (4.7:1 on paper).

### Named Rules
**The Two Signals Rule.** Green means "available" and red means "this field needs fixing". Neither hue appears anywhere else, and no third hue is added.

**The Blue Is The Accent Rule.** Blue means "you can use this" or "you are here". Emphasis in text still comes from moving a neutral to ink; blue is never used for headings, body emphasis, or decoration.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono, for code only

**Character:** One grotesque used at every size. Tight negative tracking makes the headline dense and confident. Everything else sits at ordinary tracking, close in size to body text.

### Hierarchy
- **Display** (600, 2.5rem → 3rem → 3.25rem, line-height 1.04, -0.035em): the home headline only, capped at 13ch and balanced. On short viewports (height ≤ 820px) it drops back to 2.5rem.
- **Headline** (600, 2rem → 2.5rem, line-height 1.1, -0.03em): the h1 on detail pages.
- **Lead** (400, 1.0625rem): the stack sentence (line-height 1.95, so inline chips have room) and detail-page summaries (relaxed leading).
- **Title** (600, 0.9375rem): section headings. They are deliberately barely larger than body text. List-item titles are 1rem at 600, and prose h2s are 1.125rem at 600.
- **Body** (400, 1rem, line-height 1.7, max 68ch): prose and summaries, set in `muted`. Summaries cap at 60ch.
- **Label** (500, 0.875rem): buttons, nav items, form labels, and text links. Dates and meta lines use the same size at 400 with tabular numerals.

### Named Rules
**The Sentence Case Rule.** All text is sentence case at normal tracking. There are no tracked uppercase labels, no eyebrows, and no kickers above headings.

**The One Loud Line Rule.** Only the headline uses display size. Section titles stay quiet and do not compete with it.

## Layout

- **Container:** max 72rem (`max-w-6xl`), centered. The gutter is 24px on mobile, 40px from `sm`, and 64px from `lg`.
- **Desktop (`lg`):** a two-column grid at `1fr : 1.05fr` with an 80px gap. The left column is sticky at the top, fills the viewport height (`100dvh`), and has 96px vertical padding. Its contents are spread so the CV button sits at the bottom. The right column's first section aligns with the top of the left column.
- **Short viewports (`short` variant, max-height 820px):** the sticky column tightens. Its padding drops to 48px, inner gaps shrink, the headline steps down to 2.5rem, and nav rows go from 8px to 4px vertical padding. This lets everything fit without scrolling.
- **Mobile:** one column in the same order. The scrollspy nav is hidden.
- **Section rhythm:** sections are 64px apart, then 80px from `sm` and 96px from `lg`. A section title sits 24px above its content. Section anchors offset by 96px when scrolled to.
- **Lists:** project rows have 24px vertical padding and build-log rows 20px. Experience uses a 10.5rem date column next to the content from `sm`.
- **Detail pages:** a single 42rem column. They open with a back link carrying the owner's name, then the headline, the summary, the meta line, and the prose.

## Elevation & Depth

The system is flat. There are no box shadows, no gradients, no blur or glass. Depth comes from three things: hairline rules (`line`), the slightly darker `wash` fill on chips and code, and the contrast of a solid ink fill on the single primary button. Focus is shown with a 2px ink outline offset by 3px, not a glow. The input's 1px focus ring is drawn in ink and reads as a thicker stroke, not as elevation.

### Named Rules
**The Hairline Rule.** Separate content with 1px `line` rules (list dividers, section footers, table rows, blockquote edges), never with shadows or filled cards.

## Shapes

The geometry is soft but small. Radii grow with the size of the object. The focus outline uses 4px, tech chips 6px, inputs 8px, code blocks and prose images 10px, and the form's success panel 12px. Every button is a full pill. The avatar and both status dots are perfect circles. Borders are always 1px `line`, except the avatar dot's 2.5px `paper` ring, which separates it from the photo. Photos are grayscale.

## Components

### Buttons
Two forms, both pills, both quiet.
- **Shape:** full pill (9999px).
- **Primary (Send message):** `accent-fill` deep blue, `on-accent` text, label type, 10px × 20px. On hover, opacity drops to 0.85 over 200ms. While pending it shows a progress cursor at 0.6 opacity, and the label reads "Sending…".
- **Outline (Download CV):** paper ground, 1px `line` stroke, ink text, a 16px download icon, 8px × 16px. On hover the stroke turns `accent`. It renders only when the CV file exists.

### Chips
- **Tech chip:** inline-block on the text baseline, 1px `line` border, `wash` fill, ink text at 500 and 0.92em, 6px radius. A monochrome brand logo comes first, in `accent`, like the logos on the GitHub profile badges. It works inside a running sentence, joined with English list punctuation ("A, B, and C"), and in stack rows with 6px gaps.

### Inputs / Fields
- **Style:** 1px `line` stroke, `paper` fill, 8px radius, 10px × 14px padding, body type. The label sits above at 0.875rem/500 in ink. Placeholders use `subtle`.
- **Hover / Focus:** on hover the stroke turns `subtle`. On focus the stroke turns `accent` and a 1px `accent` ring is added, with no outline glow.
- **Error:** the stroke turns `danger`, and a 0.875rem `danger` message appears 6px below, linked through `aria-describedby`. On focus the stroke returns to `accent`. The form-level error shows next to the submit button.
- **Success:** the form is replaced by a 12px-radius panel with a hairline border.

### Navigation
- **Scrollspy nav (signature):** a vertical list in the sticky column, desktop only. Each item is a horizontal rule followed by a label. At rest the rule is 32px of `subtle` and the label is `subtle`. When the item's section is active (its top has crossed 40% of the viewport) or the item is hovered, the rule extends to 64px in `accent` and the label turns ink. The width animates over 500ms with an expo ease-out, and the color over 300ms. This animation is skipped under reduced motion. Items are only listed for sections that have Published content.
- **Theme toggle:** a 36px round icon button at the right end of the avatar row (and of the back-link row on detail pages). It shows a 18px stroke sun on dark and a moon on light, in `muted`. On hover it turns ink on a `wash` circle. The site opens dark until the visitor toggles, and the choice is saved in `localStorage` and applied before paint.
- **Social links:** a row directly under the availability line. Each link is a 16px monochrome icon in `accent` plus its label (GitHub, LinkedIn, Email) in `muted` at weight 500, 0.875rem. On hover the label turns ink and underlines in `accent`. External links open in a new tab.
- **Back link:** on detail pages, an arrow and the owner's name, in `muted` turning ink.

### Links
- **Text link:** `accent`, weight 500, a 1px `line` underline offset 4px. On hover the underline turns `accent`. The availability line's "Get in touch" and prose links follow the same rule. External links add a 14px up-right arrow and open in a new tab.
- **Changelog rows:** the commit message in ink at weight 500, the source (“This site” or a Project title) below it in `subtle`, and the date right-aligned in `subtle` tabular numerals. Each row opens the commit on GitHub in a new tab. The list is measured to show the five latest rows whole, and older rows (up to 20) scroll inside its hairline frame. When there is more to scroll, a `subtle` 0.875rem line under the list says so. Inside the list the focus outline is drawn inset so the frame does not clip it. Commits that mention Claude are left out.
- **List-row links:** whole rows are clickable. The title stays ink; its underline goes from transparent to `accent` on hover, and the summary darkens from `muted` to ink.

### Avatar
A 64px grayscale circular photo with a 14px `live` dot at the bottom right, ringed in `paper`. Without a photo, the fallback is a circle in `wash` with a hairline border and the owner's initials.

### Prose
Long-form MDX (About, Projects, Build Logs) is set in `muted` at 1rem with 1.7 leading and a 68ch measure, with 1.1em between blocks. Headings and strong text are ink, and links are `accent`. List markers are `subtle`. Code is Geist Mono on `wash` with a hairline border. Tables use tabular numerals and hairline row rules.

## Do's and Don'ts

### Do:
- **Do** take every color from the eleven tokens, and let the light theme remap them through `light-dark()`.
- **Do** create hierarchy with Geist weight (400/500/600) and size, keeping section titles close to body size.
- **Do** separate content with 1px `line` rules and `wash` fills.
- **Do** make buttons full pills, either ink-filled or hairline-outlined, with label type.
- **Do** show technologies as inline chips with monochrome logos on the text baseline.
- **Do** keep motion to 200ms color, opacity, and underline transitions, plus the scrollspy rule, and respect reduced motion.
- **Do** hide any section, nav item, link, or button that has no real Published content behind it.

### Don't:
- **Don't** use box shadows, gradients, glass, or blur for depth.
- **Don't** add a hue beyond the Arknights blue. Blue is only for links, current state, focus, the primary button, and logos; green is only for availability and red only for form errors.
- **Don't** use tracked uppercase labels, eyebrows, or kickers. Everything is sentence case.
- **Don't** wrap content in filled, shadowed cards, and don't build a centered hero above a card grid.
- **Don't** add a second typeface or use Geist Mono outside code.
- **Don't** add entrance animations or scroll-triggered reveals. The scrollspy is the only scroll-linked motion.
- **Don't** show colored brand logos. Logos are always monochrome, in `accent` for tech chips and social links.

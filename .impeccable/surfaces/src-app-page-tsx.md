---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Home (single-page portfolio)

Scope: `/` (all sections) plus the Project and Build Log detail pages that inherit it. Visitor mode: Experience.

Audience and job: a Recruiter skimming for one or two minutes to decide whether to contact Naufal or download the CV. Proof is real content only; at launch nothing is Published, so About and Contact carry the page.

Constraints: user-pinned world (wahyusyahputra.com style and format, brittanychiang.com two-column layout, antfu.me tech chips). Arknights black and blue, Geist (palette changed from monochrome at Naufal's request, 2026-10-28, to match the GitHub profile: black #121416, deep blue #0A78B4, bright blue #1FB5E9). Opens dark; the theme toggle (added 2026-10-27) switches to light. Only motion is the scrollspy.

## Direction contract

THESIS: A quiet, typographic résumé page where identity and a way to make contact never leave the screen. It refuses the category default: a centered hero over a grid of shadowed cards with gradient accents.

OWN-WORLD: Black ground with near-white ink, two cool grays, and one blue accent for links, current state, focus, the primary button, and logos; hairline rules, no shadows, no gradients, no glass. Geist only, using weight and size for hierarchy, sentence case, no tracked uppercase labels. Besides the blue accent, the only hues are a small green availability dot and a red reserved for form errors. Tech names appear as inline chips with monochrome logos in blue.

STORY: The visitor learns who Naufal is and what Naufal builds from the headline, sees the stack in one sentence, reads a short About, then sends a message or downloads the CV. Sections appear only once real content is Published.

FIRST VIEWPORT: Desktop, two columns. The left column is sticky. From the top: a 64px grayscale avatar with the green dot, name and role beside it; the headline as the largest type; the stack sentence with inline chips; the availability line with GitHub/LinkedIn/Email icon-and-label links under it (moved there at Naufal's request, 2026-10-27); the vertical scrollspy nav; then the CV button at the bottom. The right column starts with About, level with the top of the left column. Primary action: the Contact nav item plus visible email. Mobile is one column in the same order, with no nav.

FORM: User-pinned composite (wahyusyahputra.com style, brittanychiang.com structure), position 1, seed:366f47f52b40b959 (the roll ran; the user-pinned direction beats it). Signature interaction: the scrollspy line extends and the label inks when its section is in view.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- About copy is drafted from confirmed facts only and still needs Naufal's review.
- CV, social URLs, Experience entries, and Projects are still to come.

- Footer credit line ("Built with Next.js and Tailwind CSS, deployed on Vercel. The source is on GitHub.") approved by Naufal on 2026-10-26.

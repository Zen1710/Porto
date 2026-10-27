# Naufal Rizky Ananda — Portfolio

Personal portfolio built with Next.js (App Router), Tailwind CSS v4, and MDX. Live at [naufalrizkyananda.vercel.app](https://naufalrizkyananda.vercel.app).

The reasoning behind the bigger decisions is in [`docs/adr/`](docs/adr/), and the project's vocabulary (Project, Build Log, Draft, …) is in [`GLOSSARY.md`](GLOSSARY.md).

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000, drafts visible
pnpm test       # unit tests (contact form screening, draft rules)
pnpm typecheck
pnpm build      # production build, drafts hidden
```

## Add content

Everything a visitor reads lives in [`content/`](content/). Adding an item means adding a file; the layout never changes.

| What | Where |
| --- | --- |
| Name, headline, stack, links | `content/profile.ts` |
| About text | `content/about.mdx` |
| A Project | `content/projects/<slug>.mdx` |
| A Build Log | `content/build-logs/<slug>.mdx` |
| Experience | `content/experience.ts` |
| Photo | `public/photo.jpg` (replace the file) |
| CV | `public/cv.pdf` (the Download CV button appears once it exists) |

Project frontmatter:

```yaml
---
title: My app
summary: One sentence on what it does.
date: 2026-10          # or 2026-10-26
stack: [nextjs, typescript, postgresql]
repo: https://github.com/you/my-app    # optional
demo: https://my-app.vercel.app        # optional
cover: /projects/my-app.png            # optional, file in public/
draft: true            # visible locally only; remove to publish
---
```

Build Logs take `title`, `summary`, `date`, and `draft`. A frontmatter mistake fails the build with the file name and the field, so nothing half-filled reaches the live site.

**Draft and Published:** an entry with `draft: true` shows up in `pnpm dev` with a Draft badge and never on the live site. A section with nothing Published is hidden along with its nav item, and so is any empty social link in `content/profile.ts`.

## Contact form

The form posts to a Server Action (`src/app/actions.ts`). It checks a honeypot field and a minimum fill time, validates input with Zod, then sends the message through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY`: from the Resend dashboard
- `CONTACT_TO_EMAIL`: where messages should arrive
- `CONTACT_FROM_EMAIL`: optional; without a verified domain Resend only sends from `onboarding@resend.dev` to your own account email

Add the same variables in Vercel under Project → Settings → Environment Variables.

## Deploy

Push to GitHub and import the repo in Vercel. Every push to `main` deploys, and every branch gets a preview URL. Enable Web Analytics in the Vercel project to start counting visits.

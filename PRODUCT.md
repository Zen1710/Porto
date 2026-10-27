# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS v4 + Geist, written in TypeScript with pnpm. Content lives as MDX files in the repo, validated by a schema. Contact form runs on a Server Action and sends mail through Resend. Hosted on Vercel Hobby (`naufalrizkyananda.vercel.app`) with Vercel Web Analytics; public GitHub repo auto-deploys from `main`. See `docs/adr/`.

## Users

Recruiters and hiring managers screening Naufal Rizky Ananda for full-time or remote roles. They arrive from a CV, LinkedIn, or a job application, skim for a minute or two, and decide whether to reach out, download the CV, or move on. Engineers reviewing a candidate may also open the public repo.

## Product Purpose

A personal portfolio that helps a junior full-stack developer get hired. Success is a Recruiter contacting Naufal or downloading the CV. It is not a storefront: nothing on the site is for sale.

## Positioning

Naufal builds full-stack web apps end to end, from database to UI. Primary stack: TypeScript and Next.js, plus Vue on the frontend and Node.js (Express), Go, and PostgreSQL on the backend. The site itself is the first proof: its design decisions are documented in public (ADRs, Build Logs).

## Operating Context

- Content is added over time by Naufal editing MDX files and pushing to GitHub; the layout must never need changes to add a Project, Experience, or Build Log.
- Every item is either Draft (visible in local dev only) or Published (visible on the live site). Sections and nav items with nothing Published are hidden automatically, as are social links and the CV button when their value or file is missing.
- At launch nothing is Published: the live site shows the Hero, About, and Contact only.

## Capabilities and Constraints

- Sections: Hero, About, Projects (each with a simple detail page), Experience (timeline), Build Logs (each with a detail page), Contact.
- Contact: a form (name, email, message) plus visible email and LinkedIn. Anti-spam is a honeypot, a time trap, and server-side schema validation; no external rate-limit service yet.
- English only. Light/dark follows the OS; no theme toggle.
- Social links: GitHub, LinkedIn, Email only.
- Terminology is defined in `GLOSSARY.md` (Recruiter, Project, Experience, Build Log, Draft, Published).

## Brand Commitments

- Name shown: Naufal Rizky Ananda. Role: Fullstack Developer.
- Headline: "I build full-stack web apps, from database to UI."
- Stack line: "I work mostly with TypeScript and Next.js, plus Vue on the frontend and Node.js, Go, and PostgreSQL on the backend."
- Availability: open to full-time and remote roles.
- Binding references chosen by the user: wahyusyahputra.com for style, general format, and tech stack (monochrome, minimal, Geist); brittanychiang.com for the two-column layout with a sticky left column and scrollspy nav; antfu.me for tech logo chips. Must not look like generic AI-generated UI.

## Evidence on Hand

- Photo: a formal ID photo (red background, suit) to be cropped to a circle and rendered grayscale; replaceable later by swapping one file.
- GitHub (https://github.com/Zen1710) and LinkedIn (https://www.linkedin.com/in/naufalrizkyananda) were supplied by Naufal. No published Projects, Experience entries, Build Logs, CV, or email exist yet. Never fabricate them; empty sections stay hidden.
- About copy is to be written with Naufal; do not invent biography facts.

## Product Principles

1. Real over impressive: show only what is true and finished; hide what is not.
2. Recruiter-first: name, role, and a way to make contact are always within reach.
3. Content grows without redesign: adding a file is the only step to add an item.
4. The site is itself evidence of craft: clean code, documented decisions, careful details.

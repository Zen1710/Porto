# Progress

Log pengembangan situs portfolio. Entri terbaru di atas. Bagian **Status** dan **Langkah berikutnya** selalu menggambarkan keadaan terkini.

## Status

- **Tahap:** pengembangan lokal. Repo: https://github.com/Zen1710/Porto. Branch `main` (stabil, sumber Changelog) dan `develop` (tempat kerja), keduanya sudah di-push. Belum di-deploy ke Vercel.
- **Situs live (saat nanti di-deploy):** baru menampilkan Hero, About, dan Contact, karena belum ada Project, Experience, atau Build Log yang Published.
- **Preview lokal:** `pnpm dev`, lalu buka http://localhost:3000. Konten Draft ikut tampil dengan label "Draft".

## Menunggu dari Naufal

- [x] URL GitHub dan LinkedIn di `content/profile.ts`
- [ ] Email di `content/profile.ts`
- [ ] CV di `public/cv.pdf`
- [ ] Review teks About di `content/about.mdx` (ditulis Claude dari fakta yang Naufal berikan)
- [ ] Lengkapi kalimat placeholder di `content/projects/portfolio-site.mdx` dan `content/build-logs/01-designing-before-coding.mdx`, lalu hapus `draft: true` kalau sudah siap tayang
- [ ] Akun Resend dan env `RESEND_API_KEY` / `CONTACT_TO_EMAIL` (lihat `.env.example`)
- [ ] Entri Experience di `content/experience.ts`

## Langkah berikutnya

1. Lanjutkan pengembangan lokal sesuai kebutuhan Naufal.
2. Kerjakan perubahan di `develop`, lalu merge ke `main` kalau sudah siap tayang.
3. Import repo ke Vercel Hobby, isi env Resend, aktifkan Web Analytics. Domain awal: `naufalrizkyananda.vercel.app`.

## Log

### 2026-10-28: Tema hitam-biru Arknights

- Palette diganti jadi hitam-biru Arknights, mengikuti GitHub profile (hitam `#121416`, biru tua `#0A78B4`, biru terang `#1FB5E9`). Layout, tipografi, dan hairline tidak berubah.
- Situs sekarang selalu terbuka gelap, apa pun setelan OS pengunjung. Mode terang tetap bisa dipilih lewat toggle.
- Biru hanya dipakai untuk hal yang bisa diklik atau sedang aktif: link, garis nav aktif, fokus, tombol Send message, logo di chip tech dan link sosial. Favicon ikut hitam-biru.
- `DESIGN.md`, `PRODUCT.md`, dan surface brief impeccable sudah diperbarui. `.impeccable/design.json` masih berisi palette lama.

### 2026-10-28: Pindah folder, Changelog lebih ringkas

- Folder project dipindah ke `~/Developer/projects/portofolio`, dan data sesi Claude ikut dipindah. Dependencies, typecheck, lint, dan tes sudah dicek ulang, semuanya aman.
- Changelog: commit yang menyebut "claude" (catatan run AI di repo Smartphone Catalog) disembunyikan. List menampilkan 5 perubahan terbaru dengan tinggi yang pas, dan sisanya (sampai 20) di-scroll di dalam list. Di bawahnya ada keterangan "Scroll the list for older changes." yang hanya muncul kalau ada lebih dari 5.

### 2026-10-27: Toggle tema dan Changelog

- Toggle light/dark: tombol bulan/matahari di kanan baris avatar (dan di halaman detail). Sebelum dipilih, tema mengikuti OS. Pilihan disimpan di `localStorage` dan diterapkan sebelum halaman tampil. Token warna sekarang memakai `light-dark()`.
- Section Changelog: commit dari repo situs ini dan repo setiap Project yang tampil, diambil dari GitHub API saat build (`docs/adr/0003-changelog-from-github-at-build.md`). `GITHUB_TOKEN` opsional untuk menaikkan rate limit.
- Commit pertama dan push: `feat: initial portfolio site`, `feat: add light/dark theme toggle`, `feat: add changelog built from GitHub commits`, `docs: record theme toggle and changelog` di `main`, lalu branch `develop` dibuat dari situ.
- Email commit diganti ke noreply GitHub (`git config user.email` khusus repo ini). History `main` dan `develop` ditulis ulang dan di-force-push supaya email pribadi hilang dari semua commit.
- Catatan: kalau warna tidak berubah di `pnpm dev` setelah CSS diedit, matikan server dev, hapus `.next/dev`, lalu jalankan lagi. CSS dev sempat tertinggal versi lama.

### 2026-10-27: Project Smartphone Catalog, link sosial

- Link GitHub (Zen1710) dan LinkedIn dipasang sebagai ikon + label tepat di bawah baris "Open to full-time and remote roles". Tombol CV tetap di bagian bawah kolom kiri.
- Footer "source is on GitHub" sekarang memakai field baru `sourceRepo` (repo situs ini), bukan link profil GitHub. Isinya https://github.com/Zen1710/Porto.
- `git init -b main` dan remote `origin` → https://github.com/Zen1710/Porto.git (repo publik yang tadinya kosong). Belum ada commit. Branch `develop` baru bisa dibuat setelah commit pertama: `git add . && git commit -m "feat: initial portfolio site" && git push -u origin main && git switch -c develop && git push -u origin develop`.
- Repo `Zen1710/phone-catalogue-test` ditambahkan sebagai Project Draft (`content/projects/phone-catalogue.mdx`) untuk mengetes tampilan. Isinya diambil dari isi repo (PRODUCT.md, kode), dengan cover dari screenshot repo di `public/projects/phone-catalogue.png`.

### 2026-10-26: Desain dan v1

- Sesi desain `/grill-with-docs`. Keputusan dicatat di `GLOSSARY.md`, `docs/adr/0001-nextjs-tailwind-v4.md`, dan `docs/adr/0002-vercel-hobby-hosting.md`. Konteks produk ada di `PRODUCT.md`.
- Referensi yang dipilih Naufal: wahyusyahputra.com (style, format umum, tech stack), brittanychiang.com (layout 2 kolom + scrollspy), dan antfu.me (chip logo tech).
- Project dibuat dengan Next.js 16.4 (App Router), Tailwind CSS v4, Geist, konten MDX (`content/`) yang divalidasi Zod, dan pnpm.
- Fitur v1: Hero sticky dengan scrollspy, About, Projects + halaman detail, Experience, Build Logs + halaman detail, Contact form (Server Action, honeypot, time trap, Resend), aturan Draft/Published, tombol CV dan link sosial yang otomatis tersembunyi, tema mengikuti OS, sitemap, robots, ikon, dan Vercel Analytics.
- Cache Components dimatikan, karena fitur itu menolak `generateStaticParams` kosong (alasannya ada di `next.config.ts`).
- UI dikerjakan dengan impeccable. Direction contract ada di `.impeccable/surfaces/src-app-page-tsx.md`, dan design system di `DESIGN.md` + `.impeccable/design.json`. Finish review: semua temuan sudah diperbaiki, dan baris kredit di footer disetujui Naufal.
- Tes: `pnpm test` (screening form kontak, aturan Draft, schema frontmatter), plus `pnpm typecheck`, `pnpm lint`, dan `pnpm build`. Semuanya lolos.

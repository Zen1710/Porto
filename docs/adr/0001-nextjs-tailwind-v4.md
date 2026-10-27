# Next.js (App Router) + Tailwind CSS v4 untuk situs portfolio

Situs dibangun dengan Next.js (App Router), Tailwind CSS v4, dan font Geist. Situs referensi gaya (wahyusyahputra.com) memakai SvelteKit, tapi kita sengaja memilih Next.js. Alasannya, Next.js adalah framework React yang paling sering diminta di lowongan fullstack, sehingga situs ini sekaligus jadi bukti skill. Next.js juga bisa merender halaman jadi HTML statis, jadi SEO dan preview link tetap bagus. Layout responsif meniru pola Tailwind dari situs referensi, bukan dari framework-nya.

## Considered Options

- **Vite + React**: paling simpel, tapi hasilnya SPA murni sehingga SEO dan OG image butuh kerja tambahan.
- **Astro + komponen React**: ringan, tapi React hanya jadi pelengkap di beberapa bagian, bukan inti situs.
- **SvelteKit**: sama dengan situs referensi, tapi tidak menunjukkan skill React.

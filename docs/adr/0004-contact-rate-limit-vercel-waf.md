# Rate limit form kontak lewat Vercel WAF

Form kontak dibatasi per IP lewat Vercel WAF Rate Limiting, yang dipanggil dari Server Action memakai `@vercel/firewall`. Honeypot dan time trap saja tidak cukup, karena `startedAt` dikirim dari browser dan bisa dipalsukan. Tanpa batas, siapa pun bisa membanjiri inbox dan menghabiskan kuota Resend.

Alternatif yang ditolak:
- **Upstash Redis (`@upstash/ratelimit`):** butuh akun dan dua env baru, padahal situsnya sudah di Vercel (ADR 0002).
- **Penghitung di memori:** di serverless setiap instance punya memorinya sendiri, jadi batasnya tidak bisa diandalkan.
- **Cloudflare Turnstile:** menambah widget dan akun. Bisa ditambahkan nanti kalau spam tetap lolos.

Konsekuensi:
- Rule-nya diatur di dashboard Vercel, bukan di repo (ID `contact-form`, 5 request per 10 menit per IP; Hobby hanya boleh 1 rule rate limit, jendela maksimal 10 menit). Tanpa rule, pengecekan meloloskan semua pesan.
- Pengecekan bersifat fail-open: kalau API firewall gagal, pesan tetap dikirim, supaya gangguan firewall tidak membungkam recruiter.
- Di luar Vercel (lokal, `next start`) pengecekan dilewati.

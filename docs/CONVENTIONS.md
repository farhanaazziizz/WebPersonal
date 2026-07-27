Terakhir diperbarui: 27 Juli 2026

# CONVENTIONS — Aplikasi Manajemen Tugas Pribadi

Beda dari empat dokumen lain: isi dokumen ini bukan hasil tanya-jawab, tapi
keputusan teknis yang diambil supaya konsisten antar sesi pengerjaan. Masih
tipis karena project baru mulai — akan tumbuh seiring pola aplikasi
mengendap.

Belum ada `CLAUDE.md` di project ini. Kalau nanti dibuat dan isinya
bertentangan dengan dokumen ini, `CLAUDE.md` yang menang.

## Penamaan

- Folder: huruf kecil, pisah kata pakai strip (`kebab-case`) — contoh
  `app/tugas`
- Komponen tampilan: huruf awal tiap kata besar (`PascalCase`) — contoh
  `TaskCard.tsx`
- Fungsi dan variabel: huruf awal kecil, kata berikutnya huruf besar
  (`camelCase`) — contoh `hitungLevelEfektif`
- Nama tabel database: `PascalCase` tunggal — contoh `Tugas`
- Nama kolom database: `camelCase` — contoh `namaTugas`, `batasWaktu`,
  `levelKepentinganAwal`, `dibuatPada`

## Pola baku

- **Ambil/simpan data**: selalu lewat titik masuk di `app/api/`, tidak pernah
  langsung query database dari komponen tampilan.
- **Validasi**: dilakukan di sisi server sebelum data disimpan, bukan cuma
  mengandalkan validasi di form. Pesan validasi ditulis dalam bahasa
  Indonesia yang jelas, bukan pesan teknis mentah.
- **Menangani error**: kesalahan teknis (pesan error asli, jejak program)
  dicatat di log server saja. Yang ditampilkan ke pemilik aplikasi cuma pesan
  singkat yang jelas maksudnya, sesuai aturan di DESIGN.md.
- **Perhitungan urutan dan level kepentingan efektif**: dihitung ulang setiap
  kali data tugas diambil, tidak pernah disimpan sebagai nilai tetap di
  database (lihat SCHEMA.md).

## Library yang dipakai

| Library | Untuk apa |
|---|---|
| Next.js (App Router) + TypeScript | Kerangka utama aplikasi |
| Tailwind CSS + shadcn/ui | Styling dan komponen tampilan |
| Prisma | Mendefinisikan struktur tabel dan baca/tulis ke database |
| Auth.js, dengan cara masuk Credentials (bukan Google) | Mengelola sesi login dari username/password, dicocokkan dengan `APP_USERNAME` dan `APP_PASSWORD_HASH` di environment variable |
| bcrypt (atau sejenis) | Mencocokkan password yang diketik dengan hash yang tersimpan, tanpa pernah menyimpan password asli |

## Hal teknis yang gampang salah

- **Tanda `$` di `APP_PASSWORD_HASH` pada `.env` wajib di-escape jadi `\$`**
  (misalnya `\$2b\$12\$...`). Next.js membaca `$NAMA` di `.env` sebagai
  referensi ke variabel lain — hash bcrypt selalu mengandung `$`, jadi kalau
  tidak di-escape, sebagian hash diam-diam hilang dan login gagal terus tanpa
  pesan error yang menjelaskan sebabnya. `scripts/buat-hash-password.mjs`
  sudah otomatis meng-escape saat mencetak hasilnya, tapi kalau menempel hash
  dari tempat lain, ingat aturan ini.

## Pendekatan yang pernah diputuskan lalu ditinggalkan

- **Login pakai Google Sign-In + daftar email yang diizinkan (whitelist)** —
  ini keputusan awal waktu brainstorming pertama kali, sempat masuk ke draf
  pertama `PRD.md`. Ditinggalkan pada 25 Juli 2026 dan diganti login
  username/password biasa, karena pemiliknya memutuskan itu sudah cukup untuk
  kebutuhan satu pengguna tanpa perlu mengurus setup akun Google/OAuth.

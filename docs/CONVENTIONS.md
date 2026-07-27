Terakhir diperbarui: 27 Juli 2026

# CONVENTIONS — Aplikasi Manajemen Tugas Pribadi

Beda dari empat dokumen lain: isi dokumen ini bukan hasil tanya-jawab, tapi
keputusan teknis yang diambil supaya konsisten antar sesi pengerjaan. Masih
tipis karena project baru mulai — akan tumbuh seiring pola aplikasi
mengendap.

`CLAUDE.md` sudah ada di root project. Kalau isinya bertentangan dengan
dokumen ini, `CLAUDE.md` yang menang.

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

- **Baca data untuk halaman (Server Component)**: lewat fungsi di
  `src/lib/<nama-modul>.ts` (contoh `ambilTugasAktif()` di `src/lib/tugas.ts`)
  yang query Prisma langsung — dipanggil dari `page.tsx`, tidak pernah dari
  komponen client. Fungsi ini wajib cek sesi login lebih dulu (lihat
  `pastikanSudahMasuk()` di `src/lib/tugas.ts`), sebelum query apa pun.
- **Ubah data dari browser (komponen client)**: selalu lewat `app/api/`,
  tidak pernah query Prisma langsung dari komponen client. Endpoint di
  `app/api/` juga wajib cek sesi login sendiri (jangan andalkan proxy.ts
  saja — itu baru lapis pertama).
- **Logika murni (bisa dipakai di client maupun server)**: taruh di file
  terpisah dari fungsi akses data, contoh `src/lib/tugas-urutan.ts` isinya
  perhitungan level efektif & urutan, dipisah dari `src/lib/tugas.ts` yang
  isinya query Prisma + cek sesi. Alasannya teknis: kalau fungsi murni dan
  fungsi akses-data digabung satu file lalu file itu diimpor komponen
  client, seluruh runtime Prisma ikut ter-bundle ke browser dan build gagal.
- **Validasi**: dilakukan di sisi server sebelum data disimpan, bukan cuma
  mengandalkan validasi di form. Pesan validasi ditulis dalam bahasa
  Indonesia yang jelas, bukan pesan teknis mentah.
- **Menangani error**: kesalahan teknis (pesan error asli, jejak program)
  dicatat di log server saja (`console.error`). Yang dikirim ke response API
  atau ditampilkan ke pemilik aplikasi cuma pesan singkat bahasa Indonesia,
  sesuai aturan di DESIGN.md. Response error API selalu `{ error: "pesan" }`
  dengan status HTTP yang sesuai (400 input salah, 401 belum login, 404 tidak
  ditemukan, 500 lainnya).
- **Perhitungan urutan dan level kepentingan efektif**: dihitung ulang setiap
  kali data tugas diambil, tidak pernah disimpan sebagai nilai tetap di
  database (lihat SCHEMA.md). Level naik 1 tingkat tiap 3 hari terlambat,
  maksimal High — lihat `hitungLevelEfektif()` di `src/lib/tugas-urutan.ts`.
- **Aksi cepat dari baris tabel** (contoh: checkbox tandai-selesai): update
  state di client dulu (optimistic), baru panggil API; kalau API gagal,
  kembalikan state semula dan tampilkan toast error. Kalau berhasil dan
  aksinya bisa dibatalkan, tampilkan toast sukses dengan tombol "Batalkan"
  (lihat `src/components/tugas/DaftarTugasAktif.tsx`).
- **Kondisi loading halaman**: JANGAN pakai `app/loading.tsx` (file konvensi
  Next.js) — di project ini kombinasi Turbopack dev + `loading.tsx` +
  RootLayout async menyebabkan halaman macet permanen menampilkan skeleton,
  konten asli tidak pernah tertukar walau datanya sudah siap (ditemukan &
  dikonfirmasi 27 Juli 2026 saat membangun modul Fokus Hari Ini, lihat STATUS
  PROJECT). Kalau butuh skeleton, taruh langsung di dalam komponen (state
  `isPending` client-side), jangan pakai file `loading.tsx`.
- **Form tambah/ubah lewat satu Dialog** (bukan dua form terpisah, bukan
  halaman terpisah — sesuai DESIGN.md): satu komponen client
  (`src/components/tugas/FormTugasDialog.tsx` adalah contohnya) menerima
  prop data yang mau diedit (`null` berarti mode tambah), `open` dan
  `onOpenChange` terkontrol dari komponen pemanggil (bukan dialog itu
  sendiri yang menyimpan status buka/tutupnya). Setelah simpan berhasil:
  tutup dialog, tampilkan toast, lalu panggil `router.refresh()` supaya
  Server Component induknya mengambil data terbaru dari database.
  Komponen daftar yang menampung data (state lokal `useState` untuk
  optimistic update) perlu menyinkronkan diri saat prop dari server
  berubah — dengan pola "adjust state saat render" (bandingkan prop lama
  vs baru langsung di badan komponen, panggil `setState` kalau beda),
  BUKAN dengan `useEffect` + `setState` — ESLint project ini menolak pola
  itu (aturan `react-hooks/set-state-in-effect`).
- **Validasi input tugas ditulis sekali**, dipakai di client (form) maupun
  server (route API) — lihat `validasiDataTugas()` di
  `src/lib/tugas-validasi.ts`. File ini sengaja terpisah dari
  `src/lib/tugas.ts` (yang isinya akses database) supaya aman diimpor
  komponen client.
- **Kategori tugas pakai `<input>` + `<datalist>` bawaan HTML** untuk
  autocomplete dari kategori yang pernah dipakai (bukan komponen combobox
  terpisah) — cukup untuk kebutuhan "boleh pilih, boleh ketik baru" tanpa
  nambah dependency. Daftar kategori diambil lewat
  `ambilDaftarKategori()` di `src/lib/tugas.ts`.
- **Tanggal (batas waktu) pakai `<input type="date">` bawaan HTML**, bukan
  komponen kalender/date-picker shadcn — alasannya sama, cukup dan tidak
  perlu dependency `react-day-picker` tambahan untuk satu kolom tanggal.

## Library yang dipakai

| Library | Untuk apa |
|---|---|
| Next.js (App Router) + TypeScript | Kerangka utama aplikasi |
| Tailwind CSS + shadcn/ui | Styling dan komponen tampilan |
| Prisma (v7, generator `prisma-client`) | Mendefinisikan struktur tabel dan baca/tulis ke database. **Wajib driver adapter** — `PrismaClient` tidak bisa dipakai langsung, harus lewat `@prisma/adapter-pg` (paket `pg` sebagai driver-nya). Instance client dibuat sekali di `src/lib/prisma.ts`, jangan bikin instance baru di tempat lain |
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
- **Impor dari `@/generated/prisma` (hasil generate Prisma) harus spesifik,
  jangan impor folder-nya langsung** — foldernya tidak punya `index.ts`.
  Pakai jalur ini sesuai kebutuhan:
  - `@/generated/prisma/client` — untuk `PrismaClient` dan namespace
    `Prisma` (error class dll). **Hanya boleh diimpor di file server-only**
    (yang query database) — kalau file ini diimpor (langsung/tidak
    langsung) dari komponen client (`"use client"`), build gagal karena
    runtime Prisma tidak bisa di-bundle untuk browser.
  - `@/generated/prisma/enums` — untuk enum (`StatusTugas`,
    `LevelKepentingan`). Ringan, aman diimpor dari komponen client maupun
    server.
  - `@/generated/prisma/models/<NamaModel>` — untuk type model (contoh
    `TugasModel`), pakai `import type`. Aman di client maupun server.
- **Script sekali-jalan di `scripts/*.ts`** (bukan bagian dari aplikasi,
  contoh isi data uji): jalankan dengan `npx tsx scripts/nama-file.ts`, taruh
  `import "dotenv/config";` di baris pertama supaya `.env` kebaca, dan buat
  `PrismaClient` sendiri dengan adapter (jangan pakai instance dari
  `src/lib/prisma.ts`, script ini di luar siklus hidup aplikasi Next.js).
  Jangan pakai ekstensi `.ts` eksplisit saat impor (`from "../src/x"`, bukan
  `from "../src/x.ts"`) — `next build` mem-verifikasi tipe seluruh file
  `.ts` di project termasuk `scripts/`, dan ekstensi eksplisit bikin build
  gagal.

## Pendekatan yang pernah diputuskan lalu ditinggalkan

- **Login pakai Google Sign-In + daftar email yang diizinkan (whitelist)** —
  ini keputusan awal waktu brainstorming pertama kali, sempat masuk ke draf
  pertama `PRD.md`. Ditinggalkan pada 25 Juli 2026 dan diganti login
  username/password biasa, karena pemiliknya memutuskan itu sudah cukup untuk
  kebutuhan satu pengguna tanpa perlu mengurus setup akun Google/OAuth.

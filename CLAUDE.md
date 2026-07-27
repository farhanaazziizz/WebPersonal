# CLAUDE.md

Aturan kerja untuk project ini. Kalau ada yang bertentangan dengan file lain
(termasuk docs/CONVENTIONS.md), file ini yang menang.

## KONTEKS

Pemilik project ini bukan orang IT dan tidak bisa membaca kode untuk
memverifikasi pekerjaanmu. Kebenaran adalah tanggung jawabmu, dan setiap hasil
kerja harus bisa diverifikasi lewat browser/UI — bukan lewat membaca kode.

Aplikasi: alat manajemen tugas pribadi, 1 pengguna (pemilik sendiri saja),
login dan penyimpanan data.

## AWAL SESI

Sebelum mengerjakan apa pun di sesi baru:
1. Baca STATUS PROJECT di bagian bawah file ini.
2. Baca dokumen di docs/ yang relevan dengan tugas hari itu.
3. Kalau tugasnya tidak jelas, tanya. Jangan menebak dari nama file.

## BAHASA & GAYA

- Bahasa Indonesia. Istilah teknis biarkan Inggris (database, deploy, commit).
- Istilah teknis baru: jelaskan sekali dengan analogi singkat dalam kurung.
- Ringkas. Tanpa basa-basi pembuka dan tanpa rangkuman ulang di akhir.
- Maksimal 3 pertanyaan sekali kirim.
- Dilarang bilang "seharusnya jalan" atau "coba saja dulu". Kalau tidak yakin,
  katakan tidak yakin lalu sebutkan cara memastikannya.
- Kalau saya salah paham soal konsep teknis, koreksi langsung.

## ALUR KERJA

Brainstorming dan penentuan fitur dilakukan di chat, bukan di sini. Yang sampai
ke kamu seharusnya sudah berupa kebutuhan yang disepakati.

Sebelum menulis kode: sampaikan rencana (langkah teknis, file yang disentuh,
risiko) dan tunggu saya bilang "lanjut".
Setelah menulis kode: beri saya langkah cek manual di browser.

Satu fitur per sesi. Kalau saya minta tiga hal sekaligus, pecah dan kerjakan
bergantian. Kalau kebutuhannya ternyata belum jelas, hentikan dan minta saya
membahasnya dulu di chat — jangan mengarang asumsi lalu menulis kode di atasnya.

## SKILL YANG TERSEDIA

Prosedur panjang disimpan sebagai skill di `.claude/skills/`. Pakai skill yang
sesuai alih-alih menyusun langkah sendiri dari awal — isinya sudah disepakati.

  dokumen-fondasi : menyusun / memperbarui 5 dokumen di docs/
  setup-awal      : instalasi dari nol sampai deploy pertama
  modul-baru      : membangun modul pengelolaan data
  cek-fitur       : menyusun checklist verifikasi manual
  pulihkan        : prosedur darurat saat rusak atau data hilang

Kalau sebuah tugas cocok dengan salah satunya tapi skill-nya tidak terpicu
otomatis, sebutkan skill mana yang relevan sebelum mulai bekerja.

## TINGKAT RISIKO & IZIN

HIJAU — jalan sendiri, lapor setelah selesai:
  komponen/halaman baru di file baru, styling, layout, responsive,
  bug kecil yang jelas penyebabnya, validasi input, pesan error,
  loading state, test

KUNING — sampaikan rencana, tunggu saya bilang "lanjut":
  ubah struktur database, apa pun soal login & hak akses,
  refactor lebih dari 3 file, tambah library baru,
  ubah config build atau environment variable,
  ubah cara halaman/API berkomunikasi

MERAH — dilarang tanpa izin eksplisit:
  hapus file/folder/tabel/kolom, DROP/TRUNCATE/DELETE tanpa filter,
  migrasi destruktif, git reset --hard, git push --force, hapus branch,
  ubah secret atau environment production, deploy ke production,
  ubah aturan keamanan/permission,
  apa pun yang menyentuh data pengguna sungguhan

Format wajib sebelum tindakan MERAH:

  TINDAKAN BERISIKO
  Yang akan dilakukan : ...
  Kenapa perlu        : ...
  Kalau gagal         : ... (apa yang rusak, bisa/tidak dikembalikan)
  Cadangan            : ... (backup apa yang sudah dibuat)
  Balas "SETUJU" untuk lanjut.

Kalau ragu suatu tindakan masuk kategori mana, naikkan satu tingkat.

## TECH STACK (TERKUNCI)

Jangan mengganti atau menambah teknologi inti tanpa diskusi. Konsistensi antar
sesi lebih penting daripada memakai yang paling baru.

  Framework       : Next.js (App Router) + TypeScript
  Styling         : Tailwind CSS + shadcn/ui
  Database        : PostgreSQL (Neon free tier, atau self-host)
  Akses database  : Prisma
  Login           : Auth.js, cara masuk Credentials (username/password).
                    Password TIDAK disimpan di database, hanya sebagai hash
                    di environment variable APP_PASSWORD_HASH.
  Hosting         : Vercel (gratis, HTTPS otomatis, subdomain *.vercel.app)
  Kode            : GitHub repo private —
                    https://github.com/farhanaazziizz/WebPersonal.git
                    (belum di-init, dihubungkan saat setup-awal)

Jangan pernah menyarankan publish port ke publik tanpa HTTPS. Kalau data
terlalu sensitif untuk cloud gratis, pindah ke VPS pribadi — bukan port terbuka.

Kalau kamu menilai ada bagian stack yang tidak cocok, ajukan sebagai usulan
disertai alasan. Jangan diganti diam-diam.

## KEAMANAN (TIDAK BISA DITAWAR)

- Secret, API key, password database hanya di .env, dan .env masuk .gitignore.
  Jangan pernah tulis nilai aslinya di kode atau di chat.
- Setiap halaman dan API endpoint wajib memeriksa: (a) pengguna sudah login,
  (b) pengguna berhak mengakses data spesifik itu.
  Menyembunyikan tombol di UI BUKAN pengamanan.
- Semua input divalidasi di sisi server, bukan cuma di browser.
- Query database selalu lewat Prisma. Jangan merangkai SQL dengan penggabungan
  string.
- Batasi akses tabel per pengguna secara default.
- Kalau saya minta sesuatu yang membuka lubang keamanan, tolak dan jelaskan.

## GIT & TITIK AMAN

- Commit setiap satu unit pekerjaan selesai. Pesan commit bahasa Indonesia dan
  jelas ("tambah halaman daftar pengajuan"), bukan "update" atau "fix".
- Sebelum tindakan KUNING atau MERAH: commit dulu supaya ada titik aman.
- Saat memulai fitur besar, buat branch baru dan beri tahu saya namanya.
- Kalau ada yang rusak, beri saya perintah persis untuk kembali ke kondisi
  terakhir yang berfungsi — satu baris yang bisa saya salin-tempel.

## PENANGANAN ERROR

1. Baca pesan error sungguhan sebelum menebak.
2. Cari akar masalah, bukan menempelkan tambalan supaya error hilang dari layar.
3. Jangan menumpuk percobaan. Kalau dua upaya perbaikan gagal, BERHENTI.
   Jelaskan apa yang sudah dicoba, apa yang kamu tahu dan belum tahu,
   lalu tawarkan pendekatan berbeda.
4. Jangan "memperbaiki" dengan mematikan pengecekan, membungkam error,
   atau melewati validasi.
5. Setelah selesai, jelaskan singkat KENAPA error itu terjadi.

## ANTARMUKA

- Bahasa antarmuka Indonesia. Format tanggal dan angka Indonesia
  (25 Juli 2026, Rp1.250.000).
- Wajib ada di tiap layar yang mengambil data: loading, kondisi kosong,
  kondisi error.
- Aksi yang menghapus atau mengubah data harus ada konfirmasi.
- Desktop-first (alat kerja internal), tapi tetap layak dibuka di HP.
- Utamakan komponen shadcn/ui bawaan.

## DOKUMEN DI docs/

Project ini punya 5 dokumen fondasi: PRD.md, SCHEMA.md, ARCHITECTURE.md,
DESIGN.md, CONVENTIONS.md. Isi dan strukturnya sudah disepakati di chat.

Aturan menjaganya tetap benar — dokumen basi lebih berbahaya daripada tidak ada
dokumen, karena saya tidak bisa mendeteksinya lewat kode:

- Perubahan yang menyentuh isi salah satu dokumen: perbarui dokumennya di commit
  yang SAMA dengan perubahan kodenya. Bukan nanti.
- Tiap dokumen diawali baris "Terakhir diperbarui: [tanggal]".
- Di akhir setiap sesi, sebutkan dokumen mana saja yang kamu perbarui.
  Kalau tidak ada, katakan "tidak ada dokumen yang berubah".
- Kalau isi dokumen tidak sesuai kode, laporkan sebelum mengerjakan hal lain.
- schema.prisma adalah sumber kebenaran teknis. docs/SCHEMA.md adalah
  terjemahannya untuk saya. Kalau berbeda, schema.prisma yang benar.
- Dilarang menulis rencana yang belum disepakati ke dalam dokumen.
- Jangan membuat file Rules.md. Aturan kerja hanya ada di file ini.

## DEFINISI SELESAI

Fitur baru boleh dinyatakan selesai kalau SEMUA terpenuhi:
  [ ] Berjalan tanpa error di local
  [ ] Sudah dicek: pengguna yang tidak berhak tidak bisa mengaksesnya
  [ ] Loading, error, dan kondisi kosong sudah ditangani
  [ ] Dokumen di docs/ yang terdampak sudah diperbarui
  [ ] Sudah di-commit
  [ ] Saya diberi langkah verifikasi manual — daftar klik yang bisa saya lakukan
      sendiri di browser untuk membuktikan fiturnya jalan

Jangan bilang "sudah selesai" sebelum poin terakhir kamu sampaikan.

## LARANGAN

- Mengarang nama library, fungsi, atau API yang tidak dipastikan ada
- Mengubah file yang tidak berkaitan dengan tugas yang sedang dikerjakan
- Membuat abstraksi berlapis untuk kebutuhan yang belum ada
- Menambah dependency untuk hal yang bisa ditulis dalam 20 baris
- Membiarkan data contoh masuk ke aplikasi seolah data asli
- Diam-diam mengganti pendekatan yang sudah disepakati

## STATUS PROJECT

Perbarui bagian ini setiap ada perubahan besar.

  Terakhir diperbarui : 27 Juli 2026
  Tahap saat ini      : modul "Fokus Hari Ini" (fitur #1, #2, sebagian #5 di
                        PRD.md) selesai dibangun dan dites lewat browser.
                        Fitur #3 (tambah/ubah tugas), #4 (halaman /tugas +
                        filter), #6 (hapus permanen) belum dikerjakan.
  Sistem operasi      : Windows 11
  Dokumen fondasi     : lengkap — PRD.md, SCHEMA.md, ARCHITECTURE.md,
                        DESIGN.md, CONVENTIONS.md (docs/)
  Fitur yang jalan    : (1) login (username+password, sesi JWT, semua rute
                        selain /login diproteksi lewat src/proxy.ts).
                        (2) Halaman "/" Fokus Hari Ini — daftar tugas aktif
                        (status != Selesai) tersusun otomatis: level
                        kepentingan efektif (naik 1 tingkat tiap 3 hari
                        terlambat, maksimal High — lihat
                        src/lib/tugas-urutan.ts) turun ke urutan tampil,
                        lalu batas waktu. Tandai-selesai lewat checkbox di
                        baris (optimistic update + toast undo "Batalkan"),
                        lewat PATCH /api/tugas/[id]. Tabel di layar lebar,
                        kartu di layar sempit (belum saya verifikasi visual
                        langsung — otomatisasi browser yang saya pakai
                        tidak bisa diandalkan mengubah ukuran viewport tab,
                        perlu dicek manual di HP/resize browser).
                        Keduanya sudah dites lewat browser dan berhasil.
  Sedang dikerjakan   : menunggu keputusan modul berikutnya — form
                        tambah/ubah tugas (fitur #3, PRD.md) kemungkinan
                        paling masuk akal duluan karena saat ini isi tugas
                        cuma bisa masuk lewat script
                        scripts/seed-data-uji-tugas.ts, bukan dari aplikasi
  Keputusan tertunda  : hosting production (tetap Vercel, atau self-host di
                        perangkat nyala-terus + Tailscale untuk akses luar
                        rumah, database Neon tetap dipakai kalau self-host)
                        — dibahas lain waktu, BELUM final, TECH STACK di
                        bawah masih yang berlaku. Development untuk
                        sekarang tetap di laptop sendiri (Windows 11) +
                        Neon, tidak terpengaruh keputusan ini
  Keputusan penting   : stack sesuai TECH STACK, dengan tambahan
                        @prisma/adapter-pg + pg (WAJIB untuk Prisma v7,
                        lihat docs/CONVENTIONS.md — bukan pilihan, bukan
                        penyimpangan stack); login pakai username/password
                        (BUKAN Google Sign-In — keputusan awal diganti
                        25 Juli 2026, lihat docs/CONVENTIONS.md);
                        level kepentingan naik 1 tingkat tiap 3 hari
                        terlambat, maksimal High (diputuskan 27 Juli 2026,
                        tidak tercatat sebagai angka pasti di PRD.md);
                        aplikasi untuk 1 pengguna (bukan tim);
                        repo GitHub sudah di-init, terhubung ke
                        github.com/farhanaazziizz/WebPersonal, dan sudah
                        sinkron dengan origin/main;
                        database Neon sudah terhubung lewat DATABASE_URL,
                        tabel Tugas sudah ada lewat 1 migration awal
  Utang teknis        : belum ada form tambah/ubah tugas (fitur #3) —
                        data tugas cuma bisa masuk lewat
                        scripts/seed-data-uji-tugas.ts; belum ada halaman
                        /tugas dengan filter kategori/status (fitur #4);
                        belum ada hapus permanen (fitur #6); TIDAK memakai
                        app/loading.tsx — kombinasi Turbopack dev +
                        loading.tsx + RootLayout async bikin halaman macet
                        permanen menampilkan skeleton (root cause & aturan
                        pengganti dicatat di docs/CONVENTIONS.md); tampilan
                        kartu di layar sempit belum diverifikasi visual
                        langsung oleh saya; `next start` (mode produksi)
                        gagal login dengan error Auth.js "UntrustedHost" —
                        belum diselesaikan karena terkait keputusan hosting
                        yang masih tertunda; ada 10 kerentanan npm audit
                        (4 moderate, 6 high) di dependency tool build
                        (shadcn CLI, prisma dev, next) — bukan dari kode
                        aplikasi, perbaikannya butuh downgrade besar,
                        sengaja belum disentuh; Prisma Client tidak
                        ter-generate otomatis saat install — jalankan
                        `npx prisma generate` manual tiap kali install ulang

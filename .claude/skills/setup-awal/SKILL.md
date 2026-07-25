---
name: setup-awal
description: Dipakai saat memulai project ini dari nol — memasang alat, membuat project Next.js, menghubungkan database dan login, lalu deploy pertama ke Vercel. Termasuk memasang backup otomatis dan pengaman perintah destruktif. Gunakan hanya untuk setup pertama kali atau saat menyiapkan ulang di komputer baru. Jangan gunakan untuk menambah fitur, memperbaiki error, atau deploy rutin.
---

# Setup Awal

Membawa project dari nol sampai berjalan di internet, dengan pengaman terpasang
sejak hari pertama.

Aturan project ada di `CLAUDE.md`. Skill ini hanya berisi urutan langkah —
jangan mengulang atau menafsirkan ulang aturan di sana.

## Cara menyampaikan

Pemilik project bukan orang IT. Cara penyampaian sama pentingnya dengan isi
langkahnya.

- **Satu langkah per giliran.** Jangan menampilkan seluruh tahap sekaligus.
  Beri satu langkah, tunggu dia melapor hasilnya, baru lanjut.
- Tiap langkah memuat empat hal: perintahnya, apa fungsinya dalam bahasa awam,
  **cara dia tahu langkah itu berhasil**, dan apa yang harus dilakukan kalau
  hasilnya berbeda.
- Kalau verifikasi gagal, **berhenti**. Jangan lanjut ke langkah berikutnya
  sambil berharap masalahnya hilang sendiri.
- Jangan pernah memintanya menempelkan isi secret, password, atau connection
  string ke dalam chat. Arahkan agar nilai itu langsung ditempel ke file `.env`
  atau ke dashboard penyedia layanan.
- Perintah yang butuh input interaktif (wizard, pilihan y/n): beri tahu di depan
  bahwa akan muncul pertanyaan, dan sebutkan jawaban apa yang harus dipilih.
- Untuk perintah yang butuh waktu lama, sebutkan perkiraan durasinya supaya dia
  tidak mengira sudah macet.

## Empat gerbang wajib

Setup **tidak boleh** dinyatakan selesai sebelum keempatnya hijau. Kalau waktu
habis, hentikan di tengah dan catat posisinya — jangan lewati gerbang mana pun
demi mengejar aplikasi cepat jalan.

| Gerbang | Isi | Kenapa wajib |
|---|---|---|
| 1 | Kode ada di GitHub, commit pertama masuk | Tanpa ini tidak ada titik aman untuk mundur |
| 2 | Aplikasi jalan di Vercel dengan HTTPS | Membuktikan alur deploy benar-benar bekerja |
| 3 | Backup database otomatis, **restore sudah diuji** | Backup yang belum pernah diuji bukan backup |
| 4 | Perintah destruktif butuh konfirmasi | Menutup risiko terbesar pemilik project |

Gerbang 3 dan 4 adalah alasan utama skill ini ada. Keduanya sering ditunda
"sampai nanti sudah ada data penting" — padahal justru saat itulah sudah
terlambat.

---

## Tahap 0 — Prasyarat

Sebelum apa pun dipasang, pastikan:

1. **`docs/PRD.md` sudah ada dan disetujui.** Kalau belum, hentikan skill ini
   dan minta dia menyelesaikan dokumen fondasi lebih dulu. Setup tanpa PRD
   berarti menebak struktur data.
2. Tanyakan sistem operasinya (Linux atau macOS) — perintahnya sedikit berbeda.
3. Tanyakan apakah dia sudah punya akun GitHub, Google, dan Vercel. Kalau belum,
   arahkan membuatnya dulu. Ketiganya gratis.
4. Tentukan nama project. Huruf kecil, pakai tanda hubung, tanpa spasi.

---

## Tahap 1 — Pasang alat dasar

Yang dibutuhkan: Node.js (mesin yang menjalankan aplikasi) dan git (pencatat
riwayat perubahan).

- Cek dulu apakah keduanya sudah ada sebelum memasang apa pun.
- Pasang Node.js lewat **nvm**, bukan installer langsung — supaya versinya bisa
  diganti tanpa merusak apa pun. Ambil perintah instalasi nvm dari repositori
  resminya, **jangan tulis dari ingatan**: nomor versinya berubah.
- Pakai Node.js versi LTS.
- Verifikasi: `node -v` dan `git -v` menampilkan nomor versi. Kalau muncul
  "command not found", terminal perlu ditutup dan dibuka ulang lebih dulu.

Kalau git belum pernah dipakai, atur nama dan email untuk pencatatan riwayat.

---

## Tahap 2 — Buat project

```
npx create-next-app@latest
```

Wizard akan bertanya beberapa hal. Jawaban yang benar: TypeScript **ya**,
ESLint **ya**, Tailwind CSS **ya**, App Router **ya**, direktori `src/`
**ya**, Turbopack **ya**, custom import alias **tidak**.

Lalu pasang komponen UI:

```
npx shadcn@latest init
```

Verifikasi: jalankan server development, buka `http://localhost:3000` di
browser, halaman bawaan Next.js muncul. Ini kali pertama dia melihat sesuatu
yang nyata — pastikan dia benar-benar membukanya sebelum lanjut.

---

## Tahap 3 — GERBANG 1: GitHub

Ini gerbang pertama karena semua langkah setelahnya berisiko, dan tanpa titik
aman dia tidak punya jalan mundur.

1. Buat repository **private** di GitHub.
2. Pastikan `.gitignore` sudah memuat `.env` dan `node_modules`. Periksa
   isinya, jangan berasumsi.
3. Commit pertama, lalu push.
4. **Verifikasi wajib:** minta dia membuka halaman repository di browser dan
   memastikan file-nya terlihat — dan memastikan tidak ada file `.env` di sana.

Kalau `.env` ternyata ikut terkirim, hentikan semuanya dan bereskan dulu
sebelum melanjutkan.

---

## Tahap 4 — Database

1. Buat project PostgreSQL di Neon (atau penyedia lain sesuai `CLAUDE.md`).
   Pilih region terdekat dengan Indonesia.
2. Salin connection string **langsung ke file `.env`**. Jangan lewat chat.
3. Pasang Prisma dan inisialisasi.
4. Susun `schema.prisma` **berdasarkan `docs/SCHEMA.md`**, bukan tebakan. Kalau
   ada yang tidak jelas di dokumen itu, tanya — jangan diisi sendiri.
5. Jalankan migrasi pertama.
6. Verifikasi: buka Prisma Studio, tabel-tabelnya muncul sesuai dokumen.

Sesuai `CLAUDE.md`, perubahan skema termasuk tindakan KUNING. Di tahap ini
database masih kosong, jadi risikonya rendah — tapi tetap sampaikan rencana
tabelnya sebelum menjalankan migrasi.

---

## Tahap 5 — Login Google

Ini bagian paling berliku bagi orang non-IT, karena melibatkan dashboard
Google Cloud yang penuh istilah asing. Perlambat langkahnya di sini.

1. Pasang Auth.js. **Periksa dokumentasi resminya untuk perintah instalasi dan
   pola konfigurasi versi terkini** — jangan tulis dari ingatan, API-nya
   berubah antar versi mayor.
2. Di Google Cloud Console: buat project, siapkan OAuth consent screen, buat
   OAuth client ID untuk aplikasi web.
3. Daftarkan redirect URI. Untuk sekarang cukup alamat localhost; alamat
   Vercel ditambahkan di Tahap 6 — ingatkan dia bahwa ini akan dikunjungi lagi.
4. Client ID dan client secret ditempel langsung ke `.env`.
5. Batasi siapa yang boleh masuk. Aplikasi ini untuk 2-10 orang internal, jadi
   **jangan biarkan siapa pun dengan akun Google bisa login.** Diskusikan
   pendekatannya: daftar email yang diizinkan, atau pembatasan domain.
6. Verifikasi: login dengan akun sendiri berhasil. Lalu **uji negatif** — coba
   dengan akun di luar daftar dan pastikan ditolak. Langkah kedua ini yang
   paling sering dilewati, dan yang paling penting.

---

## Tahap 6 — GERBANG 2: Deploy ke Vercel

1. Hubungkan repository GitHub ke Vercel.
2. Masukkan semua environment variable di dashboard Vercel. File `.env` tidak
   ikut terkirim ke GitHub, jadi ini harus diisi manual — jelaskan alasannya,
   karena ini titik bingung yang umum.
3. Deploy.
4. Tambahkan alamat Vercel sebagai redirect URI di Google Cloud Console, jika
   belum. Login akan gagal tanpa ini.
5. Verifikasi: buka alamat `*.vercel.app` dari HP, di luar jaringan kantor, dan
   login berhasil. Pastikan alamatnya diawali `https://`.

Setelah gerbang ini, aplikasinya sudah hidup di internet. Ingatkan dia bahwa
mulai sekarang setiap push ke GitHub akan otomatis ter-deploy.

---

## Tahap 7 — GERBANG 3: Backup

Yang harus tercapai, bukan cara spesifiknya — mekanisme tiap penyedia berubah,
jadi periksa dokumentasi terkini sebelum menyusun langkahnya:

1. **Ketahui apa yang sudah ada.** Cek berapa lama penyedia database menyimpan
   riwayat pemulihan di paket yang dipakai. Sampaikan angkanya secara jujur —
   di paket gratis biasanya jauh lebih pendek daripada yang dia bayangkan.
2. **Backup terjadwal ke lokasi terpisah.** Harian, dan hasilnya tersimpan di
   luar penyedia database itu sendiri. Backup yang hilang bersamaan dengan
   databasenya tidak menyelamatkan apa pun.
3. **Uji pemulihannya sekarang juga.** Pulihkan backup ke database kosong yang
   terpisah dan pastikan datanya benar-benar ada. Gerbang ini **belum hijau**
   sampai pemulihan berhasil diuji, bukan sekadar backup berhasil dibuat.
4. Catat prosedur pemulihannya di `docs/ARCHITECTURE.md` dalam bahasa awam,
   supaya bisa dibaca saat panik.

---

## Tahap 8 — GERBANG 4: Pengaman perintah

`CLAUDE.md` memuat aturan tindakan MERAH, tapi itu kesepakatan — bukan pagar
yang memaksa. Gerbang ini mengubahnya jadi pengaman teknis.

1. Periksa dokumentasi Claude Code terkini untuk pengaturan permission, lalu
   konfigurasikan agar perintah berikut selalu meminta konfirmasi: penghapusan
   file rekursif, `DROP`, `TRUNCATE`, `DELETE` tanpa filter, `git reset --hard`,
   `git push --force`, dan penghapusan branch.
2. **Uji bahwa pengamannya benar-benar bekerja.** Coba jalankan satu perintah
   tidak berbahaya yang masuk pola tersebut, dan pastikan konfirmasi muncul.
   Konfigurasi yang belum diuji tidak dihitung.
3. Jelaskan ke dia bahwa saat konfirmasi muncul, itu tanda untuk berhenti dan
   membaca — bukan tombol yang ditekan otomatis.

---

## Penutup

Setelah keempat gerbang hijau:

1. Perbarui **STATUS PROJECT** di `CLAUDE.md`: tahap, tanggal, apa yang sudah
   terpasang.
2. Perbarui `docs/ARCHITECTURE.md`: environment variable yang dipakai (nama
   saja), alur deploy, prosedur pemulihan.
3. Commit semuanya.
4. Beri dia ringkasan sepuluh baris: alamat aplikasinya, di mana kodenya, di
   mana databasenya, kapan backup berjalan, dan apa langkah berikutnya.

Jangan langsung menawarkan membangun fitur di sesi yang sama. Setup sudah cukup
panjang, dan fitur pertama layak dimulai dari kondisi segar.

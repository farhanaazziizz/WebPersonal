Terakhir diperbarui: 25 Juli 2026

# ARCHITECTURE — Aplikasi Manajemen Tugas Pribadi

Tidak ada kebutuhan kirim email/notifikasi, impor dari Excel/CSV, atau ekspor
data ke tempat lain di versi 1 — jadi arsitekturnya sesederhana mungkin, tanpa
bagian yang menghubungkan ke layanan luar.

## Alur sederhana

Buka aplikasi lewat browser → aplikasi (jalan di Vercel) memproses permintaan
→ aplikasi baca/tulis data ke database (jalan di Neon) → hasilnya dikirim
balik ke browser untuk ditampilkan.

Semua perhitungan urutan tugas dan kenaikan level kepentingan terjadi di sisi
aplikasi, dihitung ulang setiap kali halaman dibuka — bukan disimpan sebagai
nilai tetap di database.

## Struktur folder

- `app/` — semua halaman aplikasi (Fokus Hari Ini, daftar tugas, login) dan
  alamat yang dipakai aplikasi untuk baca/tulis data
- `app/login/` — halaman login
- `app/tugas/` — halaman daftar tugas lengkap dengan filter
- `app/api/` — titik masuk yang dipanggil aplikasi sendiri untuk
  menyimpan/mengambil/mengubah data tugas
- `components/` — potongan tampilan yang dipakai berulang (kartu tugas,
  tombol, form)
- `lib/` — kode bantu yang dipakai di banyak tempat: aturan urutan tugas dan
  kenaikan level kepentingan, koneksi ke database, pengecekan login
- `prisma/` — definisi struktur tabel database beserta riwayat perubahannya
- `public/` — berkas statis seperti ikon aplikasi

## Alur login

1. Buka aplikasi. Kalau belum masuk, langsung diarahkan ke halaman login.
2. Isi username dan password, tekan Masuk.
3. Aplikasi mencocokkan isian dengan username/password yang sudah diset di
   pengaturan server (bukan tersimpan di database — lihat SCHEMA.md).
4. Kalau cocok, aplikasi membuat sesi masuk yang disimpan di browser, supaya
   tidak perlu login ulang tiap buka halaman baru.
5. Kalau tidak cocok, tetap di halaman login dengan pesan gagal masuk.
6. Setelah berhasil, langsung diarahkan ke halaman Fokus Hari Ini.

Setiap halaman dan setiap titik masuk di `app/api/` memeriksa sesi ini sebelum
menampilkan atau mengubah apa pun — bukan cuma menyembunyikan tombol di
tampilan.

## Environment variable yang dibutuhkan

Nama saja, nilainya diisi langsung di pengaturan Vercel saat setup, tidak
pernah ditulis di kode atau dokumen manapun.

| Nama | Untuk apa |
|---|---|
| `DATABASE_URL` | Alamat koneksi ke database Neon |
| `AUTH_SECRET` | Kunci rahasia untuk mengamankan sesi login |
| `APP_USERNAME` | Username untuk masuk ke aplikasi |
| `APP_PASSWORD_HASH` | Password untuk masuk, disimpan dalam bentuk teracak (hash), bukan teks polos — supaya kalau pengaturan server ini bocor, password aslinya tidak langsung ketahuan |

## Alur deploy

1. Simpan perubahan kode di laptop, kirim ke GitHub (repo privat).
2. Vercel otomatis mendeteksi perubahan itu dan membangun ulang aplikasi.
3. Kalau proses build berhasil, versi baru otomatis tayang di alamat yang
   sama — tidak ada langkah manual tambahan.
4. Kalau proses build gagal, versi yang sedang tayang tidak berubah — aman,
   tinggal perbaiki kodenya dan kirim ulang.

## Kalau terjadi masalah

**Aplikasi tidak bisa dibuka (Vercel bermasalah):**
1. Buka dashboard Vercel, cek daftar deployment terakhir.
2. Kalau deployment terbaru berstatus gagal atau bikin aplikasi rusak, cari
   deployment sebelumnya yang masih berstatus baik.
3. Tekan tombol "Redeploy" pada deployment yang masih baik itu.

**Database tidak bisa diakses (Neon bermasalah):**
1. Buka dashboard Neon, cek status project.
2. Kalau project berstatus "tertidur" karena lama tidak dipakai (wajar untuk
   paket gratis), tinggal buka dashboard-nya untuk membangunkannya lagi.
3. Kalau statusnya error di luar itu, cek halaman status Neon untuk tahu
   apakah ini gangguan dari pihak Neon sendiri.

**Data hilang atau berubah tanpa sengaja:**

BELUM DITENTUKAN — prosedur pemulihan dari backup baru bisa ditulis lengkap
setelah backup otomatis benar-benar dipasang (bagian dari skill setup-awal).
Begitu itu selesai, bagian ini wajib dilengkapi dengan: di mana backup
tersimpan, dan langkah persis mengembalikannya.

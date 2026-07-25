Terakhir diperbarui: 25 Juli 2026

# PRD — Aplikasi Manajemen Tugas Pribadi

## Masalah

Tugas-tugas disimpan di kepala, akibatnya sering terlupa atau dikerjakan dengan
urutan yang salah. Prioritas juga sering berubah cepat, tapi cara mencatat yang
sekarang tidak mengikuti perubahan itu.

Sudah dicoba pakai aplikasi pencatat tugas yang umum (semacam Todoist atau
Trello), tapi aplikasi-aplikasi itu hanya menandai tugas yang "terlambat" —
tidak ikut menaikkan level kepentingannya. Jadi tugas yang sudah lewat batas
waktu tetap tenggelam di antara tugas lain yang levelnya sama-sama terlihat
"biasa saja", padahal harusnya sudah mendesak. Kebutuhan untuk otomatis
menaikkan level kepentingan saat sebuah tugas terlambat inilah yang tidak
tersedia di aplikasi manapun yang sudah dicoba, dan jadi satu-satunya alasan
aplikasi ini dibuat sendiri dari nol.

## Pengguna

Aplikasi ini dipakai oleh satu orang saja, yaitu pemiliknya sendiri. Tidak ada
peran lain. Hanya pemilik yang tahu username dan password untuk masuk — tidak
ada jalan lain untuk membuka aplikasi ini.

## Fitur versi 1

Diurutkan dari yang paling penting:

1. **Daftar tugas yang urutannya dihitung otomatis**, berdasarkan gabungan
   level kepentingan dan kedekatan batas waktu. Level kepentingan sebuah tugas
   naik dengan sendirinya begitu tugas itu terlambat, dan makin lama
   terlambat, levelnya bisa naik lagi. Ini inti dari seluruh aplikasi — tanpa
   fitur ini, aplikasi tidak ada gunanya dibanding sekadar mencatat di kertas.
2. **Halaman "Fokus Hari Ini"** — begitu dibuka, langsung terlihat tugas-tugas
   aktif yang sudah tersusun sesuai urutan di atas, tanpa perlu menyusun atau
   menyaring apa pun secara manual.
3. **Mencatat tugas baru dan mengubah tugas yang sudah ada** — nama tugas,
   batas waktu, level kepentingan awal, kategori, dan catatan tambahan.
4. **Halaman daftar tugas lengkap**, bisa disaring berdasarkan kategori dan
   status (belum dikerjakan, sedang dikerjakan, atau sudah selesai).
5. **Menandai tugas selesai** — tugas langsung hilang dari daftar aktif tapi
   tidak dihapus, dan masih bisa dibatalkan kalau salah tandai. Tugas yang
   sudah selesai tetap bisa dilihat lagi lewat penyaring status.
6. **Menghapus tugas secara permanen**, tapi harus lewat langkah yang sengaja
   dan sadar, bukan tombol yang gampang tersenggol.
7. **Masuk pakai username dan password**, bukan lewat akun Google. Hanya
   pemilik aplikasi yang punya kredensial ini.

## Yang sengaja tidak dibuat di versi 1

- **Pengingat lewat Telegram atau notifikasi otomatis pagi/sore** — bukan
  bagian dari masalah inti (urutan kerja yang salah), sekadar tambahan yang
  bisa menyusul kalau memang dibutuhkan.
- **Halaman depan yang bisa dilihat orang luar** — aplikasi ini murni untuk
  pemakaian pribadi, tidak perlu ada bagian yang terbuka untuk umum.
- **Kategori sebagai daftar resmi yang dikelola lewat halaman tersendiri** —
  cukup diketik bebas dulu di versi 1, belum perlu ada halaman khusus untuk
  mengatur daftar kategori.
- **Label, perkiraan waktu pengerjaan, tugas turunan (sub-tugas), lampiran
  berkas, tanggal mulai, dan pencatatan siapa pemberi tugas** — semuanya bukan
  bagian dari cara menentukan urutan kerja, yang jadi alasan utama aplikasi ini
  dibangun. Bisa ditambahkan belakangan kalau ternyata dibutuhkan.
- **Dipakai oleh lebih dari satu orang** — aplikasi ini memang dirancang untuk
  dipakai sendiri.

## Kriteria sukses

Tiga bulan setelah dipakai sehari-hari, buktinya berhasil adalah: sudah tidak
ada lagi tugas yang lewat batas waktu tanpa disadari.

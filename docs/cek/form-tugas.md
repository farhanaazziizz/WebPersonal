# Cek: Form Tambah/Ubah Tugas
Dibuat: 27 Juli 2026  ·  Diuji di: [ ] Komputer  [ ] Online

## Persiapan

- Akun yang dibutuhkan: akun login utama (username `farhanaziz`).
- Data uji: tidak wajib data awal — kalau mau, jalankan
  `npx tsx scripts/seed-data-uji-tugas.ts` supaya ada tugas lain untuk
  dicoba diubah.
- Jalankan aplikasi: `npm run dev`, buka `http://localhost:3000`, login.

## 1. Alur normal — tambah tugas

[ ] 1.1  Lakukan: Klik tombol "Tambah Tugas" di halaman Fokus Hari Ini.
         Seharusnya: Muncul kotak dialog berjudul "Tambah Tugas" dengan
         kolom Nama Tugas, Batas Waktu, Level Kepentingan, Kategori, dan
         Catatan (opsional).

[ ] 1.2  Lakukan: Isi Nama Tugas dengan "Cek checklist form", Batas Waktu
         dengan tanggal besok, Kategori dengan "Cek Fitur", biarkan Level
         Kepentingan default (Medium), lalu klik "Simpan".
         Seharusnya: Dialog tertutup, muncul notifikasi "Tugas
         ditambahkan", dan baris baru "Cek checklist form" muncul di
         daftar tugas.

[ ] 1.3  Lakukan: Muat ulang halaman (refresh browser).
         Seharusnya: Tugas "Cek checklist form" masih ada — data benar
         tersimpan, bukan cuma tampilan sesaat.

## 2. Alur normal — ubah tugas

[ ] 2.1  Lakukan: Klik pada baris tugas "Cek checklist form" (bukan
         checkbox-nya, klik di bagian lain baris itu).
         Seharusnya: Muncul kotak dialog berjudul "Ubah Tugas", dengan
         semua kolom sudah terisi sesuai data tugas itu (nama, tanggal,
         level, kategori).

[ ] 2.2  Lakukan: Ubah Nama Tugas jadi "Cek checklist form (sudah diubah)",
         ubah Level Kepentingan jadi "High", lalu klik "Simpan".
         Seharusnya: Notifikasi "Tugas diperbarui" muncul, baris di daftar
         berubah jadi nama baru dan badge level jadi High.

[ ] 2.3  Lakukan: Muat ulang halaman.
         Seharusnya: Perubahan nama dan level tadi tetap tersimpan.

## 3. Autocomplete kategori

[ ] 3.1  Lakukan: Buka dialog Tambah Tugas lagi, klik kolom Kategori lalu
         mulai ketik satu-dua huruf dari kategori yang pernah dipakai
         sebelumnya (misalnya "Kan" kalau pernah ada kategori "Kantor").
         Seharusnya: Muncul saran kategori yang cocok untuk dipilih,
         tapi kamu tetap bisa mengetik nama kategori baru yang belum
         pernah ada.

## 4. Input yang salah

[ ] 4.1  Lakukan: Buka dialog Tambah Tugas, biarkan semua kolom kosong,
         langsung klik "Simpan".
         Seharusnya: Muncul pesan di bawah tiap kolom wajib ("Nama tugas
         wajib diisi.", "Batas waktu wajib diisi.", "Kategori wajib
         diisi."), dialog TIDAK tertutup, dan TIDAK ada tugas baru masuk
         ke daftar.

[ ] 4.2  Lakukan: Isi Nama Tugas saja (kosongkan Batas Waktu dan
         Kategori), klik "Simpan".
         Seharusnya: Cuma pesan untuk Batas Waktu dan Kategori yang
         muncul; pesan untuk Nama Tugas hilang.

[ ] 4.3  Lakukan: Klik tombol "Batal" di dialog (baik sedang mengisi data
         kosong maupun sudah ada isian).
         Seharusnya: Dialog tertutup, tidak ada perubahan apa pun ke
         daftar tugas.

## 5. Hak akses

[ ] 5.1  Lakukan: Buka jendela incognito (tanpa login), coba akses
         langsung lewat alat developer browser / curl ke alamat
         `http://localhost:3000/api/tugas` dengan method POST — atau
         cukup coba buka `http://localhost:3000` di incognito dan
         pastikan tidak bisa sampai ke tombol "Tambah Tugas" sama sekali.
         Seharusnya: Diarahkan ke halaman login sebelum sempat melihat
         tombol Tambah Tugas.

## Pembersihan

Setelah selesai cek, hapus tugas percobaan "Cek checklist form (sudah
diubah)" lewat aplikasi kalau fitur hapus sudah ada, atau catat untuk
dihapus manual — fitur hapus permanen belum dibangun di modul ini.

## Hasil
Tanggal diuji : 
Lulus         : __ / __
Yang gagal    : 

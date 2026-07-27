# Cek: Fokus Hari Ini
Dibuat: 27 Juli 2026  ·  Diuji di: [ ] Komputer  [ ] Online

## Persiapan

- Akun yang dibutuhkan: akun login utama (username `farhanaziz`, password
  yang sudah kamu tetapkan sendiri). Aplikasi ini untuk 1 pengguna saja,
  jadi tidak perlu akun kedua untuk uji hak akses.
- Data uji: jalankan `npx tsx scripts/seed-data-uji-tugas.ts` di terminal
  sebelum mulai — ini mengisi 6 tugas percobaan berawalan "[Uji]". Setelah
  selesai cek, bersihkan dengan `npx tsx scripts/hapus-data-uji-tugas.ts`.
- Jalankan aplikasi lebih dulu: `npm run dev`, buka `http://localhost:3000`.

## 1. Alur normal

[ ] 1.1  Lakukan: Buka `http://localhost:3000`, login dengan akun kamu.
         Seharusnya: Langsung masuk ke halaman "Fokus Hari Ini", judul dan
         6 baris tugas berawalan "[Uji]" terlihat.

[ ] 1.2  Lakukan: Perhatikan urutan baris dari atas ke bawah.
         Seharusnya: Urutan levelnya High, High, Medium, Medium, Medium,
         Low (2 tugas High duluan, lalu 3 Medium, baru Low paling bawah).
         Di antara level yang sama, tugas dengan batas waktu lebih awal ada
         di atas.

[ ] 1.3  Lakukan: Perhatikan baris "[Uji] Kirim laporan bulanan ke atasan".
         Seharusnya: Levelnya tertulis **High** (bukan Medium seperti nilai
         awalnya) dan ada keterangan "(telat 6 hari)" di sebelah tanggal.

[ ] 1.4  Lakukan: Klik checkbox di baris "[Uji] Bayar tagihan listrik".
         Seharusnya: Baris itu langsung hilang dari daftar, dan muncul
         notifikasi (toast) bertuliskan tugas itu ditandai selesai,
         lengkap dengan tombol "Batalkan".

[ ] 1.5  Lakukan: Klik tombol "Batalkan" di notifikasi tadi, sebelum
         notifikasinya hilang sendiri.
         Seharusnya: Baris "[Uji] Bayar tagihan listrik" muncul lagi di
         daftar, di posisi yang sama seperti semula (paling bawah, level
         Low).

[ ] 1.6  Lakukan: Muat ulang halaman (refresh browser) setelah langkah 1.5.
         Seharusnya: Ke-6 tugas uji masih ada semua — pembatalan di 1.5
         benar-benar tersimpan, bukan cuma tampilan sesaat.

[ ] 1.7  Lakukan: Kali ini klik checkbox "[Uji] Bayar tagihan listrik" lagi
         dan JANGAN klik "Batalkan" — biarkan notifikasinya hilang sendiri.
         Lalu muat ulang halaman.
         Seharusnya: Tugas itu tetap hilang dari daftar (sudah benar-benar
         tersimpan sebagai Selesai, bukan cuma tampilan).

## 2. Hak akses

[ ] 2.1  Lakukan: Buka jendela browser baru dalam mode penyamaran/incognito
         (supaya tidak bawa sesi login), ketik langsung
         `http://localhost:3000` di kolom alamat.
         Seharusnya: Diarahkan ke halaman login, bukan ke Fokus Hari Ini.

[ ] 2.2  Lakukan: Masih di jendela incognito yang sama, coba ketik langsung
         `http://localhost:3000/` (tanpa login).
         Seharusnya: Tetap diarahkan ke halaman login.

[ ] 2.3  Lakukan: Di jendela browser biasa (yang sudah login), klik tombol
         "Keluar" di kanan atas. Lalu coba tekan tombol "Back" di browser.
         Seharusnya: Tidak bisa melihat daftar tugas lagi — diarahkan balik
         ke halaman login.

## 3. Kondisi kosong dan error

[ ] 3.1  Lakukan: Tandai SEMUA tugas uji sebagai selesai satu per satu
         (klik checkbox tiap baris sampai daftar habis, biarkan
         notifikasinya hilang sendiri tiap kali).
         Seharusnya: Setelah baris terakhir ditandai selesai, muncul pesan
         "Tidak ada tugas aktif hari ini" (bukan halaman kosong polos).

[ ] 3.2  Lakukan: Jalankan lagi `npx tsx scripts/seed-data-uji-tugas.ts`
         untuk mengisi ulang data uji, lalu muat ulang halaman.
         Seharusnya: 6 tugas uji muncul lagi, pesan "Tidak ada tugas aktif"
         hilang.

[ ] 3.3  Lakukan: Matikan koneksi internet laptop (atau matikan sebentar
         aplikasi/servernya di terminal), lalu klik checkbox salah satu
         tugas.
         Seharusnya: Muncul notifikasi pesan gagal singkat (bukan halaman
         putih/error teknis), dan baris tugasnya kembali muncul lagi di
         daftar (tidak hilang permanen padahal gagal tersimpan).

## 4. Di HP

[ ] 4.1  Lakukan: Buka halaman ini dari HP (pastikan HP dan laptop satu
         wifi, akses lewat alamat IP laptop, misalnya
         `http://10.32.198.168:3000` — sesuaikan dengan yang tertulis saat
         `npm run dev` dijalankan).
         Seharusnya: Tampilan berubah jadi susunan kartu (bukan tabel),
         teks bisa dibaca tanpa perlu zoom, dan checkbox bisa ditekan jari
         dengan mudah.

## Hasil
Tanggal diuji : 
Lulus         : __ / __
Yang gagal    : 

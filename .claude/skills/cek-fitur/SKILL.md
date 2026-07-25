---
name: cek-fitur
description: Dipakai saat sebuah fitur selesai dikerjakan dan pemiliknya perlu membuktikan sendiri bahwa fitur itu benar-benar jalan, atau sebelum aplikasi diserahkan ke tim untuk dipakai. Menyusun checklist berisi langkah klik di browser dengan hasil yang seharusnya muncul, termasuk uji hak akses. Jangan gunakan untuk menulis automated test, code review, atau memperbaiki bug.
---

# Cek Fitur

Menyusun checklist verifikasi manual — daftar langkah klik yang bisa dijalankan
pemilik project sendiri di browser untuk membuktikan sebuah fitur bekerja.

Aturan project ada di `CLAUDE.md`, termasuk Definisi Selesai. Skill ini hanya
menyusun checklistnya.

## Kenapa ini penting

Pemilik project tidak bisa membaca kode. Checklist ini adalah satu-satunya
bukti yang bisa dia periksa sendiri. Kalau checklistnya dangkal, dia percaya
sesuatu berfungsi padahal tidak — dan baru tahu setelah timnya memakainya.

**Dia yang menjalankan, bukan kamu.** Kamu boleh memeriksa lebih dulu apa yang
bisa kamu periksa, tapi jangan menyatakan lulus atas namanya. Bukti yang
dihasilkan sendiri oleh yang memeriksa bukan bukti.

## Sebelum menyusun

Baca dulu, jangan menyusun dari ingatan sesi:

- `docs/PRD.md` — apa yang seharusnya terjadi menurut kebutuhan aslinya
- `docs/SCHEMA.md` — siapa boleh membaca dan mengubah data ini

Checklist yang menguji "apa yang dibuat kodenya" tidak ada gunanya. Yang diuji
adalah "apa yang seharusnya", dan itu hanya ada di dokumen.

## Cara menulis butirnya

- Bahasa klik, bukan bahasa teknis. "Buka halaman Pengajuan, klik tombol Tambah",
  bukan "panggil endpoint POST /pengajuan".
- Tiap butir memuat dua bagian: **yang dilakukan** dan **yang seharusnya
  terjadi**.
- Hasilnya harus lulus atau gagal, tanpa ruang tafsir. Bukan "datanya muncul
  dengan benar", tapi "muncul baris baru berisi nama yang tadi diisi".
- Satu butir menguji satu hal. Kalau sebuah butir bisa gagal karena dua sebab
  berbeda, pecah.
- Sebutkan data uji yang konkret. "Isi nama: Uji Coba 1" lebih baik daripada
  "isi nama apa saja" — supaya hasilnya bisa dicocokkan.

---

## Enam kelompok yang wajib ada

### 1. Alur normal

Jalur yang memang dituju fitur ini, dari klik pertama sampai selesai. Ambil
urutannya dari alur pemakaian di `docs/PRD.md`.

### 2. Hak akses — uji negatif

**Kelompok paling penting, dan paling sering dilewati.**

Semua kelompok lain menguji sesuatu *terjadi*. Kelompok ini menguji sesuatu
*tidak terjadi* — dan kegagalan di sini tidak pernah muncul sendiri sebagai
error di layar. Aplikasinya akan terlihat baik-baik saja sambil membocorkan
data.

Yang diuji:

- Masuk sebagai pengguna yang tidak berhak, pastikan fitur ini tidak bisa
  diakses.
- Buka alamat halamannya langsung lewat kolom URL — bukan lewat tombol.
  Menyembunyikan tombol bukan pengamanan; ini yang membuktikannya.
- Kalau ada data milik orang lain, coba buka datanya dengan mengganti nomor di
  alamat URL. Harus ditolak.
- Buka alamat halamannya tanpa login sama sekali. Harus diarahkan ke halaman
  login.

**Soal akun kedua.** Uji ini butuh pengguna lain. Sebelum menyusun checklist,
pastikan dia punya caranya — akun Google kedua, atau perannya diubah sementara
lewat database. Kalau belum ada, siapkan dulu; jangan tulis butir uji yang
tidak mungkin dia jalankan.

### 3. Input yang salah

- Kirim form dalam keadaan kosong
- Isi kolom angka dengan huruf
- Isi teks yang sangat panjang
- Kirim dua kali berturut-turut dengan cepat

Yang dinilai bukan cuma "ditolak", tapi **pesan penolakannya bisa dimengerti**.
Pesan error yang menampilkan istilah teknis dianggap gagal.

### 4. Kondisi kosong, loading, dan error

- Buka halaman saat belum ada data sama sekali — harus ada penjelasan, bukan
  layar kosong
- Perhatikan saat data sedang dimuat — harus ada tanda, bukan layar membeku
- Kalau memungkinkan, matikan koneksi internet lalu coba simpan — harus ada
  pesan, bukan diam saja

### 5. Data benar-benar tersimpan

Sering dilewati karena terlihat sepele, padahal ini yang membedakan "terlihat
berhasil" dari "berhasil":

- Setelah menyimpan, muat ulang halaman — datanya masih ada?
- Keluar, login lagi — datanya masih ada?
- Buka dari perangkat lain — datanya muncul?

### 6. Di HP

Sesuai `CLAUDE.md`, aplikasi ini desktop-first tapi tetap harus layak dibuka di
HP. Cukup periksa: teks terbaca tanpa dizoom, tombol bisa ditekan, tabel tidak
terpotong.

---

## Kalau fiturnya sudah online

Ulangi kelompok 1, 2, dan 5 di alamat `*.vercel.app`, bukan hanya di komputer.

Berhasil di komputer sendiri tidak membuktikan berhasil online — environment
variable, database, dan pengaturan login bisa berbeda. Ini penyebab tersering
"tadi jalan kok sekarang tidak".

Jangan menguji memakai data tim yang sungguhan. Pakai data uji yang jelas
terlihat sebagai uji coba, dan bersihkan setelahnya.

---

## Format keluaran

Simpan sebagai `docs/cek/[nama-fitur].md`:

```
# Cek: [Nama Fitur]
Dibuat: [tanggal]  ·  Diuji di: [ ] Komputer  [ ] Online

## Persiapan
- Akun yang dibutuhkan: ...
- Data uji: ...

## 1. Alur normal
[ ] 1.1  Lakukan: ...
         Seharusnya: ...

## 2. Hak akses
[ ] 2.1  Lakukan: ...
         Seharusnya: ...

...

## Hasil
Tanggal diuji : 
Lulus         : __ / __
Yang gagal    : 
```

Disimpan sebagai file, bukan ditempel di chat — supaya bisa dipakai ulang
sebagai uji regresi setiap kali fitur ini tersentuh perubahan lain. Inilah cara
dia mengetahui sebuah fitur lama masih jalan setelah fitur baru ditambahkan.

Panjang yang wajar: 12–20 butir. Kalau lebih dari 25, fiturnya terlalu besar
untuk satu checklist — pecah menurut alurnya.

---

## Kalau ada yang gagal

1. **Minta dia menjalankan checklist sampai habis** sebelum kamu memperbaiki
   apa pun. Satu penyebab sering memunculkan beberapa kegagalan sekaligus, dan
   memperbaiki satu per satu membuang waktu.
2. Minta nomor butir yang gagal dan apa yang sebenarnya terjadi. Jangan minta
   dia menebak sebabnya.
3. Kegagalan di kelompok 2 (hak akses) dinaikkan prioritasnya di atas semua
   kegagalan lain, apa pun bentuknya.
4. Setelah diperbaiki, checklist dijalankan **dari awal**, bukan hanya butir
   yang tadi gagal.

---

## Penutup

Fitur dinyatakan selesai hanya setelah dia sendiri melaporkan seluruh butir
lulus — sesuai Definisi Selesai di `CLAUDE.md`.

Simpan checklistnya, commit, dan sebutkan letak filenya supaya dia bisa
membukanya lagi nanti.

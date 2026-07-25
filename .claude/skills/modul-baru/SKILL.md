---
name: modul-baru
description: Dipakai saat menambahkan modul atau fitur baru yang mengelola satu jenis data — halaman daftar, form tambah dan ubah, halaman detail, beserta hak aksesnya. Contoh pemicu — "buat modul pengajuan", "tambah fitur data pelanggan", "bikin halaman untuk mencatat barang". Jangan gunakan untuk setup awal, perbaikan bug, perubahan tampilan saja, atau fitur yang tidak menyimpan data.
---

# Modul Baru

Membangun satu modul pengelolaan data secara utuh, dengan pola yang sama setiap
kali.

Aturan project — tingkat risiko, keamanan, git, definisi selesai — ada di
`CLAUDE.md`. Skill ini hanya berisi urutan dan pola pembangunannya.

## Prinsip

**Konsistensi lebih berharga daripada kepintaran.** Aplikasi ini akan berisi
banyak modul yang mirip. Modul kesepuluh harus terlihat dan bekerja persis
seperti modul pertama, supaya pemiliknya bisa menebak cara kerjanya tanpa
belajar ulang, dan supaya perbaikan di satu tempat bisa diterapkan di semua
tempat.

Kalau kamu menemukan cara yang lebih baik daripada pola yang sudah ada, ajukan
sebagai usulan terpisah. Jangan diam-diam memakainya hanya di modul ini.

## Sebelum mulai

1. **Pastikan kebutuhannya sudah disepakati.** Modul ini harus sudah tercantum
   di `docs/PRD.md`. Kalau belum — atau kalau isinya masih kabur — hentikan dan
   minta dia membahasnya dulu di chat. Jangan menebak lalu menulis kode di
   atasnya.
2. **Baca tiga dokumen ini**, jangan menyusun dari ingatan sesi:
   - `docs/SCHEMA.md` — struktur data dan siapa boleh mengaksesnya
   - `docs/CONVENTIONS.md` — pola yang sudah berlaku di modul sebelumnya
   - `docs/DESIGN.md` — komponen dan pola tampilan yang dipakai
3. **Kalau ini bukan modul pertama**, cocokkan dengan modul yang sudah ada.
   Setiap penyimpangan dari pola lama harus kamu sampaikan beserta alasannya —
   bukan dilakukan diam-diam.

---

## Tahap 1 — Tentukan bentuknya

Tanyakan maksimal tiga hal, ambil sisanya dari dokumen:

1. Siapa yang boleh membuat, mengubah, dan melihat data ini?
2. Setelah dibuat, datanya bisa diubah selamanya, atau terkunci setelah kondisi
   tertentu? (misalnya setelah disetujui)
3. Ada tahapan status yang dilalui? (draf → diajukan → disetujui)

Ringkas jawabannya jadi satu paragraf, konfirmasi, baru lanjut.

---

## Tahap 2 — Data

Perubahan struktur database termasuk tindakan KUNING menurut `CLAUDE.md`.
Sampaikan rencana tabelnya dan tunggu persetujuan sebelum menjalankan migrasi.

Pola baku yang berlaku untuk semua modul:

- **Penandaan batal, bukan penghapusan.** Alat kerja internal hampir selalu
  butuh jejak. Kecuali `docs/SCHEMA.md` menyatakan lain, data ditandai batal
  atau selesai — tidak dihapus dari tabel.
- **Catat pemilik dan waktu.** Siapa membuat, kapan, siapa terakhir mengubah,
  kapan. Ini yang membuat pertanyaan "siapa yang mengubah ini" bisa dijawab
  nanti.
- Nama tabel dan kolom mengikuti `docs/CONVENTIONS.md`. Kalau belum ada
  aturannya, tetapkan sekarang dan catat di sana.

Setelah migrasi berhasil, perbarui `docs/SCHEMA.md` dalam bahasa awam — di
commit yang sama.

---

## Tahap 3 — Hak akses, sebelum tampilan

**Ini urutan yang paling menentukan, dan yang paling sering dibalik.**

Kalau tampilan dibangun lebih dulu lalu hak akses ditambahkan belakangan, akan
selalu ada satu jalur yang terlewat — dan jalur yang terlewat itu tidak
menghasilkan error, hanya kebocoran diam-diam.

Jadi bangun lapisan aksesnya lebih dulu:

1. Tulis satu fungsi yang menentukan data mana yang boleh dilihat pengguna ini,
   dan satu lagi yang menentukan boleh atau tidak dia mengubahnya.
2. **Semua** pengambilan data di modul ini lewat fungsi tersebut. Tidak ada
   query langsung yang melewatinya, termasuk untuk keperluan sementara.
3. Baru setelah itu bangun halamannya di atas lapisan tersebut.

Dengan urutan ini, halaman yang lupa diperiksa tidak akan menampilkan apa-apa —
gagal dengan cara yang terlihat, bukan gagal diam-diam.

---

## Tahap 4 — Halaman daftar

Pintu masuk modul, dan halaman yang paling sering dibuka. Isi bakunya:

- Tabel berisi kolom yang benar-benar dipakai untuk mengenali baris — bukan
  semua kolom yang ada
- Pencarian, kalau datanya bisa lebih dari satu layar
- Penyaring berdasarkan status, kalau modulnya punya tahapan
- Tombol tambah di posisi yang sama seperti modul lain
- Tiga kondisi wajib: sedang memuat, belum ada data, gagal memuat

Kondisi "belum ada data" bukan sekadar layar kosong — beri penjelasan singkat
dan tombol untuk mulai mengisi. Ini layar pertama yang dilihat pengguna baru.

Untuk data yang bisa bertambah banyak, siapkan pemenggalan halaman sejak awal.
Menambahkannya belakangan berarti mengubah hampir seluruh halaman.

---

## Tahap 5 — Form tambah dan ubah

Satu form untuk keduanya, bukan dua form terpisah — kalau tidak, keduanya akan
berbeda perlakuan dalam beberapa bulan.

- **Aturan validasi ditulis sekali**, lalu dipakai di browser dan di server.
  Menulisnya dua kali berarti keduanya akan berbeda cepat atau lambat.
  Validasi server tetap wajib, apa pun yang sudah dicek di browser.
- Pesan kesalahan dalam bahasa yang dimengerti pengguna, bukan istilah teknis.
- Tombol simpan dinonaktifkan selama proses simpan berjalan, supaya tidak
  terkirim dua kali.
- Setelah berhasil simpan: beri tanda berhasil, lalu arahkan ke tempat yang
  masuk akal — biasanya halaman detail atau kembali ke daftar.
- Kalau isian belum tersimpan dan pengguna hendak meninggalkan halaman,
  ingatkan.

---

## Tahap 6 — Detail dan aksi

- Halaman detail menampilkan data lengkap beserta catatan siapa membuat dan
  kapan terakhir diubah.
- Aksi yang mengubah atau membatalkan data wajib melalui konfirmasi, dengan
  kalimat yang menyebut objeknya — bukan "Yakin?", tapi "Batalkan pengajuan
  cuti tanggal 3 Agustus?".
- Tombol yang tidak berhak diakses pengguna ini **disembunyikan sekaligus
  ditolak di server**. Yang pertama untuk kenyamanan, yang kedua untuk
  keamanan.

---

## Tahap 7 — Data uji

Sebelum diserahkan untuk diperiksa, siapkan beberapa baris data uji yang jelas
terlihat sebagai uji coba. Tanpa ini, dia membuka halaman kosong dan tidak bisa
memeriksa apa pun.

Sertakan juga cara membersihkannya nanti.

---

## Tahap 8 — Verifikasi

Susun checklist verifikasi manual menggunakan skill **`cek-fitur`**. Jangan
menyusun checklist sendiri di sini — polanya sudah diatur di sana, dan dua
versi yang berbeda akan saling menyimpang.

Modul dinyatakan selesai hanya setelah dia melaporkan seluruh butir lulus,
sesuai Definisi Selesai di `CLAUDE.md`.

---

## Tahap 9 — Catat polanya

Ini yang membuat modul berikutnya lebih cepat.

- **Kalau ini modul pertama:** catat pola yang baru saja kamu tetapkan di
  `docs/CONVENTIONS.md` — penamaan, struktur folder, cara mengambil data, cara
  validasi, cara menangani error. Modul ini jadi cetakan.
- **Kalau bukan yang pertama:** catat hanya hal baru yang belum tercatat, dan
  setiap penyimpangan dari pola lama beserta alasannya.
- Perbarui `docs/DESIGN.md` kalau ada halaman atau pola tampilan baru.
- Perbarui **STATUS PROJECT** di `CLAUDE.md`.

**Soal menyeragamkan kode berulang:** tunggu sampai pola yang sama muncul di
**tiga** modul. Dua kemiripan sering kebetulan; tiga baru pola. Menyeragamkan
terlalu cepat menghasilkan struktur yang harus dibongkar lagi saat modul ketiga
ternyata berbeda.

---

## Ukuran modul

Kalau modul ini butuh lebih dari sekitar lima halaman, atau menyentuh lebih
dari dua jenis data yang tidak berhubungan langsung, pecah jadi beberapa modul
dan kerjakan bergantian.

Modul yang terlalu besar tidak bisa diperiksa dengan benar — checklistnya jadi
terlalu panjang untuk dijalankan sungguhan, dan akhirnya cuma dicentang.

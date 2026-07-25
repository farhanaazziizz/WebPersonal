---
name: dokumen-fondasi
description: Dipakai saat menyusun atau memperbarui dokumen fondasi di docs/ — PRD.md, SCHEMA.md, ARCHITECTURE.md, DESIGN.md, CONVENTIONS.md. Gunakan di awal project sebelum ada kode, atau saat fitur besar mengubah kebutuhan yang sudah tercatat. Jangan gunakan untuk menulis kode, menambah fitur, atau memperbarui dokumen sebagai bagian rutin dari pengerjaan fitur.
---

# Dokumen Fondasi

Menyusun lima dokumen di `docs/` yang jadi rujukan seluruh project.

Aturan menjaga dokumen tetap sinkron ada di `CLAUDE.md`. Skill ini hanya soal
**cara menyusun isinya** — jangan mengulang aturan di sana.

## Prinsip

Pemilik project bukan orang IT. Dokumen ini adalah satu-satunya cara dia
memverifikasi bahwa pemahamanmu benar sebelum kode ditulis. Kalau isinya
dikarang, dia tidak punya cara mendeteksinya — dan kesalahannya baru muncul
berbulan-bulan kemudian dalam bentuk aplikasi yang salah.

Karena itu:

- **Isi dokumen berasal dari jawabannya, bukan dari asumsimu.** Kalau ada yang
  belum kamu ketahui, tanya. Jangan diisi dengan tebakan yang masuk akal.
- Bagian yang belum bisa dijawab ditulis `BELUM DITENTUKAN` beserta pertanyaan
  yang menggantung. Jauh lebih aman daripada isian karangan yang terlihat rapi.
- **Satu dokumen per giliran.** Selesaikan, minta persetujuan, baru lanjut.
  Jangan pernah menghasilkan lima dokumen sekaligus.
- Maksimal 3 pertanyaan sekali kirim. Kalau butuh lebih, buat bertahap.
- Tanyakan dengan bahasa kerja sehari-hari, bukan bahasa teknis. Bukan
  "entitas apa yang perlu dimodelkan", tapi "benda atau dokumen apa saja yang
  kalian catat".

## Urutan dan ketergantungan

Berurutan, karena tiap dokumen memakai hasil dokumen sebelumnya:

```
PRD ──> SCHEMA ──> ARCHITECTURE ──> DESIGN ──> CONVENTIONS
```

**Yang menghambat dan yang tidak.** `PRD.md` dan `SCHEMA.md` harus benar-benar
matang — setup dan seluruh struktur data bergantung padanya. Tiga dokumen
sisanya boleh dimulai tipis dan tumbuh sambil jalan.

Kalau dia mulai kelelahan setelah dua dokumen, itu wajar dan bukan kegagalan.
Tawarkan berhenti di situ, lalu lanjut ke setup. Lima dokumen sempurna yang
membuatnya menyerah sebelum menulis kode lebih buruk daripada dua dokumen kuat
plus tiga kerangka.

---

## 1. PRD.md — apa dan kenapa

Bahasa awam sepenuhnya. Tanpa satu pun istilah teknis, tanpa menyebut nama
teknologi.

### Cara menggali

Jangan mulai dengan "fitur apa yang kamu mau" — jawabannya akan berupa daftar
keinginan, bukan masalah. Mulai dari pekerjaan nyatanya:

1. Ceritakan pekerjaan yang berulang dan menyusahkan. Terjadi berapa sering?
2. Sekarang dikerjakan pakai apa — WhatsApp, Excel, kertas, ingatan?
3. Bagian mana yang paling sering salah atau terlambat?
4. Siapa saja yang terlibat, dan masing-masing melakukan apa?
5. Kalau aplikasi ini tidak pernah dibuat, apa ruginya?

Lalu pertajam ruang lingkupnya:

6. Dari semua yang tadi disebut, **satu** hal mana yang kalau tidak ada,
   aplikasi ini jadi tidak berguna? Itu inti versi 1.
7. Mana yang sebenarnya bisa ditunda?
8. Tiga bulan setelah dipakai, apa yang membuktikan ini berhasil?

Pertanyaan nomor 6 adalah yang paling berharga. Orang cenderung menyebut
sepuluh fitur; tugasmu mempersempitnya jadi satu yang benar-benar penting.

### Isi dokumen

- Masalah yang diselesaikan, dan bagaimana dikerjakan sekarang
- Daftar pengguna dan peran masing-masing
- Fitur versi 1, diurutkan berdasarkan prioritas
- Yang **sengaja** tidak dibuat di versi 1, beserta alasannya
- Kriteria sukses

### Tanda PRD yang buruk

- Isinya daftar fitur tanpa penjelasan masalah yang mendasarinya
- Bagian "masalah" sebenarnya berisi solusi ("kami butuh dashboard")
- Kriteria sukses tidak bisa diukur ("supaya lebih efisien")
- Bagian "tidak dibuat" kosong — artinya ruang lingkupnya belum dipersempit

---

## 2. SCHEMA.md — data

Diturunkan dari alur kerja di PRD, bukan dirancang dari nol. Kalau ada tabel
yang tidak bisa kamu tarik dari PRD, berarti PRD-nya belum lengkap — kembali ke
sana dulu.

### Cara menggali

1. Dari alur kerja di PRD, benda atau dokumen apa saja yang dicatat?
   (pengajuan, pelanggan, barang, jadwal)
2. Untuk tiap benda: informasi apa yang harus tercatat? Minta contoh isian
   nyata, bukan nama kolom.
3. Mana yang wajib diisi, mana yang boleh kosong?

Lalu empat pertanyaan yang jarang terpikirkan olehnya, tapi mahal kalau
terlewat:

4. **Kalau salah input, datanya dihapus atau ditandai batal?** Untuk hampir
   semua alat kerja internal, jawabannya "ditandai" — dan itu mengubah
   rancangan tabelnya. Tanyakan eksplisit.
5. **Perlu tahu siapa mengubah apa dan kapan?** Kalau ya, riwayat perubahan
   harus dirancang sejak awal, bukan ditambal belakangan.
6. **Data lama disimpan berapa lama?** Selamanya, atau ada masa kedaluwarsa?
7. **Siapa boleh melihat data milik orang lain?** Ini menentukan aturan hak
   akses di seluruh aplikasi.

### Isi dokumen

- Tiap tabel: untuk apa, dalam bahasa bisnis
- Tiap kolom penting: artinya apa, contoh isinya
- Hubungan antar tabel dalam kalimat biasa
  ("satu pengajuan dimiliki oleh satu pengguna")
- Klasifikasi sensitivitas: biasa / data pribadi / rahasia
- Siapa boleh membaca dan siapa boleh mengubah tiap tabel

Hubungan antar tabel **selalu** ditulis sebagai kalimat, tidak pernah sebagai
notasi. Dia harus bisa membacanya dan bilang "bukan, satu pengajuan bisa punya
banyak penyetuju" — dan itu hanya mungkin kalau kalimatnya biasa.

---

## 3. ARCHITECTURE.md — bagaimana bekerjanya

Stack sudah ditentukan di `CLAUDE.md`, jadi dokumen ini mencatat **bagaimana
bagian-bagiannya tersambung**, bukan memilih ulang teknologinya.

### Yang perlu ditanyakan

Sebagian besar isi dokumen ini kamu susun sendiri, tapi tiga hal harus
ditanyakan karena berdampak besar ke rancangan:

1. Aplikasi perlu mengirim email atau notifikasi?
2. Perlu memasukkan data dari file yang sudah ada (Excel, CSV)?
3. Perlu mengeluarkan data untuk dipakai di tempat lain?

Ketiganya sering baru disadari saat aplikasi hampir jadi, dan mahal kalau
ditambahkan belakangan.

### Isi dokumen

- Alur sederhana dalam teks: browser → aplikasi → database
- Struktur folder, satu baris penjelasan per folder
- Alur login dari klik pertama sampai berhasil masuk
- Environment variable yang dibutuhkan — **nama saja, bukan nilainya**
- Alur deploy: dari kode di laptop sampai jalan di Vercel
- Prosedur pemulihan saat database atau hosting bermasalah

Bagian pemulihan ditulis untuk dibaca **saat panik**: kalimat pendek, urutan
jelas, tanpa istilah yang perlu dicari artinya dulu.

---

## 4. DESIGN.md — tampilan

Panduan konsistensi, bukan spesifikasi desain lengkap. Ringkas saja.

### Yang perlu ditanyakan

1. Dipakai dari laptop, HP, atau keduanya? (Sudah ada arahan desktop-first di
   `CLAUDE.md` — konfirmasi apakah masih sesuai.)
2. Ada warna atau logo perusahaan yang harus dipakai?
3. Dari seluruh alur di PRD, aksi apa yang paling sering dilakukan setiap hari?

Jawaban nomor 3 menentukan apa yang harus paling mudah dijangkau. Kalau ada
satu hal yang dilakukan lima puluh kali sehari, itu tidak boleh terkubur di
dalam tiga lapis menu.

### Isi dokumen

- Daftar halaman dan tujuan masing-masing
- Navigasi: dari halaman mana bisa menuju halaman mana
- Warna, font, dan ukuran yang dipakai konsisten
- Komponen shadcn/ui mana untuk pola apa — tabel data, form, konfirmasi hapus,
  notifikasi
- Aturan tampilan kondisi loading, kosong, dan error

---

## 5. CONVENTIONS.md — kesepakatan teknis

Berbeda dari empat dokumen sebelumnya: ini **tidak** digali dari dia. Isinya
keputusan teknis yang kamu ambil, dicatat supaya konsisten antar sesi.

Di awal project isinya akan tipis, dan itu memang seharusnya. Tulis yang sudah
pasti, biarkan sisanya tumbuh seiring pola aplikasi mengendap.

### Isi dokumen

- Penamaan file, folder, tabel, dan variabel
- Pola baku untuk hal berulang: cara mengambil data, cara validasi, cara
  menangani error
- Library yang dipakai dan untuk apa
- Pendekatan yang pernah dicoba lalu ditinggalkan, beserta alasannya

Bagian terakhir yang paling berharga seiring waktu. Tanpanya, tiga bulan lagi
kamu akan mengusulkan ulang pendekatan yang sudah terbukti gagal.

Kalau isi dokumen ini bertentangan dengan `CLAUDE.md`, `CLAUDE.md` yang menang.

---

## Saat dipakai ulang

Skill ini juga dipanggil saat fitur besar mengubah kebutuhan yang sudah
tercatat. Perlakuannya berbeda dari penyusunan awal:

1. **Baca dokumen yang ada lebih dulu.** Jangan menulis ulang dari nol.
2. Tunjukkan bagian mana yang akan berubah, dan apa yang menggantikannya —
   sebelum mengubahnya.
3. Kalau perubahannya membatalkan keputusan lama, catat keputusan lama itu di
   `CONVENTIONS.md` beserta alasan ditinggalkan. Jangan hapus jejaknya.
4. Perubahan pada PRD hampir selalu merembet ke SCHEMA. Periksa, jangan
   berasumsi tidak ada dampaknya.

---

## Penutup

Setelah tiap dokumen disetujui:

1. Simpan di `docs/`, diawali baris `Terakhir diperbarui: [tanggal]`.
2. Commit satu per satu, jangan digabung. Riwayatnya jadi terbaca.
3. Perbarui **STATUS PROJECT** di `CLAUDE.md`: dokumen mana yang sudah ada.

Setelah `PRD.md` dan `SCHEMA.md` selesai, beri tahu dia bahwa setup sudah bisa
dimulai — dan tanyakan apakah mau lanjut menyusun tiga dokumen sisanya dulu,
atau langsung memasang aplikasinya.

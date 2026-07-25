---
name: pulihkan
description: Prosedur darurat saat aplikasi rusak, error tidak selesai-selesai, perbaikan malah memperburuk keadaan, data hilang atau berubah tanpa sengaja, atau pemiliknya sudah buntu dan ingin kembali ke kondisi terakhir yang berfungsi. Kata pemicu — "rusak", "kacau", "makin parah", "balikin seperti semula", "aku buntu", "datanya hilang". Prioritaskan skill ini di atas perbaikan biasa. Jangan gunakan untuk bug biasa yang baru pertama kali muncul dan penyebabnya jelas.
---

# Pulihkan

Skill ini dipakai saat keadaan sudah buruk. Tujuannya **bukan** memperbaiki
masalah — tujuannya mengembalikan ke kondisi yang diketahui berfungsi, supaya
diagnosa bisa dimulai dari tanah yang padat.

Aturan project ada di `CLAUDE.md`. Skill ini hanya berisi prosedur darurat.

## Hukum pertama: berhenti

Kalau skill ini terpicu, artinya perbaikan biasa sudah gagal. **Jangan menambah
satu perbaikan lagi.** Penyebab tersering "buntu total" pada project seperti ini
bukan bug yang rumit, tapi tumpukan tambalan — sudah lima kali diubah, sekarang
tidak ada yang tahu lagi kondisi mana yang sebenarnya benar.

Sebelum menyentuh apa pun, katakan ini ke pemiliknya:

> Saya hentikan dulu perbaikannya. Kita kembalikan ke kondisi terakhir yang
> jalan, pastikan benar-benar jalan, baru cari penyebabnya. Tidak ada yang
> hilang — kondisi rusaknya saya simpan dulu.

## Cara berbicara di situasi ini

Pemiliknya bukan orang IT dan sedang panik. Cara bicara ikut menentukan hasil.

- Kalimat pendek. Satu instruksi per giliran.
- **Jangan minta dia mendiagnosa.** Bukan "menurutmu kenapa?", tapi "tolong
  jalankan ini, lalu tempel hasilnya".
- Jangan minta dia membaca log panjang. Minta dia menempelkannya, kamu yang baca.
- Jangan menceramahi soal apa yang seharusnya dilakukan dari awal. Tidak
  membantu sekarang, dan pelajarannya dicatat di akhir.
- Sebutkan sejak awal bahwa keadaan ini bisa dikembalikan. Itu yang paling ingin
  dia dengar.

---

## Tahap 1 — Amankan kondisi rusak

Dilakukan **sebelum** apa pun dikembalikan. Mundur tanpa langkah ini akan
menghapus bukti dan pekerjaan yang belum tersimpan.

1. Simpan seluruh perubahan yang belum ter-commit ke branch terpisah, beri nama
   berpola `rusak/[tanggal]`.
2. Catat nomor commit terakhir sebelum mundur.
3. Sampaikan ke dia: kondisi rusaknya sudah disimpan, tidak ada yang hilang.

Kalau kerusakannya menyangkut data, **jangan sentuh database sama sekali** di
tahap ini. Lanjut ke Tahap 2 dulu.

---

## Tahap 2 — Kenali jenis kerusakannya

Tiga jenis, dan penanganannya berbeda total. Salah menebak jenis berarti
membuang waktu di jalur yang salah.

Tanyakan tiga hal ini — tidak lebih:

1. Rusaknya di komputermu, atau di aplikasi yang online?
2. Kapan terakhir kali semuanya masih normal? Apa yang dikerjakan sejak itu?
3. Ada data yang hilang atau berubah, atau tampilannya saja yang bermasalah?

Lalu petakan:

| Gejala | Jenis | Ke tahap |
|---|---|---|
| Error setelah ada perubahan kode | Kode | 3 |
| Data hilang, terhapus, atau salah berubah | Data | 4 |
| Tidak ada yang diubah, tiba-tiba mati | Layanan eksternal | 5 |

Kalau ragu, cek Tahap 5 lebih dulu. Percuma membongkar kode selama satu jam
kalau ternyata penyedia databasenya yang sedang bermasalah.

---

## Tahap 3 — Kerusakan kode

### Kalau yang rusak aplikasi online

Ini kabar baiknya: **tidak perlu memperbaiki kode dulu.** Vercel menyimpan
seluruh riwayat deploy, dan versi lama bisa dinaikkan kembali dalam hitungan
detik.

1. Buka dashboard Vercel, cari deployment terakhir yang berhasil.
2. Naikkan kembali versi itu ke production.
3. Verifikasi: buka alamat aplikasinya, pastikan sudah normal.
4. Beri tahu dia bahwa penggunanya sudah aman, dan perbaikan kode bisa
   dikerjakan tanpa terburu-buru.

Selesaikan langkah ini dulu sebelum menyentuh kode apa pun. Tekanan waktu
adalah penyebab utama perbaikan terburu-buru yang memperburuk keadaan.

### Kalau yang rusak di komputernya

1. Kembalikan kode ke commit terakhir yang diketahui berfungsi.
2. Bersihkan hasil build lama dan pasang ulang dependency — dua penyebab
   tersering "kodenya sudah benar tapi tetap error".
3. **Verifikasi titik amannya benar-benar aman:** jalankan aplikasi, minta dia
   membuka di browser dan memastikan normal.

Poin ketiga tidak boleh dilewati. Kalau ternyata commit itu pun rusak, mundur
lagi satu langkah, dan ulangi sampai ketemu yang benar-benar jalan. Tanpa
titik pijak yang terbukti, seluruh diagnosa berikutnya menebak-nebak.

---

## Tahap 4 — Kerusakan data

Paling menakutkan bagi pemiliknya, dan paling mudah diperburuk oleh tindakan
tergesa.

### Aturan mutlak

- **Jangan menjalankan perintah tulis apa pun ke database** sebelum kondisinya
  jelas. Termasuk perintah yang niatnya memperbaiki.
- **Jangan memulihkan backup menimpa database yang sedang berjalan.** Pulihkan
  ke database kosong yang terpisah, periksa isinya, baru putuskan.
- Ini tindakan MERAH menurut `CLAUDE.md`. Ikuti format izinnya.

### Urutan

1. **Ukur kerusakannya.** Data apa yang hilang, sejak kapan, berapa banyak.
   Baca database, jangan menulis.
2. **Cek apakah benar-benar terhapus.** Kalau rancangannya memakai penandaan
   batal alih-alih penghapusan, datanya mungkin masih ada dan hanya tidak
   tampil. Periksa ini sebelum menyentuh backup.
3. **Buka prosedur pemulihan** di `docs/ARCHITECTURE.md`. Prosedur itu ditulis
   saat setup justru untuk momen ini.
4. **Pulihkan ke database terpisah**, lalu periksa datanya lengkap.
5. **Sampaikan pilihannya ke dia** sebelum bertindak: berapa banyak data yang
   kembali, dan berapa yang akan hilang dari rentang antara backup terakhir
   dan sekarang. Dia yang memutuskan, bukan kamu.
6. Baru pindahkan data yang disetujui.

Kalau backup ternyata tidak ada atau tidak bisa dipulihkan, katakan terus
terang dan segera — jangan digantung sambil mencoba-coba. Lalu bantu dia
menghitung apa yang masih bisa disusun ulang dari sumber lain.

---

## Tahap 5 — Layanan eksternal

Kalau tidak ada yang diubah tapi tiba-tiba mati, kemungkinan besar bukan
kodenya. Periksa berurutan, dari yang paling sering:

1. **Halaman status** Vercel, penyedia database, dan Google — cek gangguan yang
   sedang berlangsung.
2. **Kuota paket gratis** — habisnya kuota sering muncul sebagai error yang
   terlihat seperti bug.
3. **Kredensial kedaluwarsa** — sertifikat atau kunci OAuth yang lewat masa
   berlaku.
4. **Environment variable** yang berubah atau terhapus di dashboard.

Kalau ternyata gangguan dari pihak penyedia, katakan apa adanya dan sebutkan
perkiraan waktunya kalau ada. Jangan mencoba menambal di sisi kode — itu
menciptakan masalah baru yang akan tertinggal setelah gangguannya berlalu.

---

## Tahap 6 — Baru diagnosa

Setelah kondisi stabil dan terverifikasi, baru cari penyebabnya.

1. Bandingkan branch `rusak/` dengan titik aman. Perbedaannya memuat
   penyebabnya.
2. Cari satu perubahan yang memicu, bukan menambal gejalanya.
3. Sesuai `CLAUDE.md`: kalau dua upaya perbaikan gagal, berhenti lagi dan
   tawarkan pendekatan berbeda. Jangan kembali menumpuk percobaan.
4. Terapkan perbaikan di branch baru dari titik aman — **bukan** dari branch
   rusak.

---

## Tahap 7 — Tutup dengan benar

Jangan langsung membubarkan sesi begitu aplikasinya jalan lagi.

1. Jelaskan dalam tiga kalimat: apa yang rusak, kenapa, dan apa yang mencegahnya
   berulang.
2. Catat di `docs/CONVENTIONS.md`: pendekatan yang gagal beserta alasannya.
   Ini yang mencegah kamu mengusulkan ulang jalan buntu yang sama tiga bulan
   lagi.
3. Kalau penyebabnya adalah pengaman yang belum terpasang — backup tidak jalan,
   permission guard belum aktif — perbaiki sekarang juga, jangan dijadwalkan.
4. Hapus branch `rusak/` hanya setelah dia menyetujui.
5. Perbarui **STATUS PROJECT** di `CLAUDE.md`.

Terakhir, kalau kejadian ini mengungkap kelemahan yang akan terulang, katakan
sekali dengan jelas — lalu sudahi. Dia baru saja melewati jam yang buruk.

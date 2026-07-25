Terakhir diperbarui: 25 Juli 2026

# SCHEMA — Aplikasi Manajemen Tugas Pribadi

## Tabel: Tugas

Mencatat satu tugas yang perlu dikerjakan pemilik aplikasi. Ini satu-satunya
tabel di aplikasi ini — semua fitur di PRD.md berputar di sekitar data ini.

| Kolom | Wajib diisi | Artinya | Contoh isian |
|---|---|---|---|
| Nama tugas | Ya | Judul singkat, satu baris | "Kirim laporan bulanan ke atasan" |
| Batas waktu (due date) | Ya | Tanggal tugas harus selesai. Jadi dasar perhitungan urutan tampil dan pemicu kenaikan level kepentingan | 30 Juli 2026 |
| Level kepentingan awal | Ya, default Medium | High / Medium / Low. **Nilai ini disimpan apa adanya dan tidak pernah ditimpa** — beda dari level yang benar-benar tampil di layar, yang dihitung ulang setiap halaman dibuka berdasarkan level awal ini digabung dengan seberapa lama tugas sudah lewat batas waktu | High |
| Kategori | Ya | Teks bebas. Saat mengisi, muncul pilihan dari kategori yang pernah dipakai sebelumnya (supaya tidak perlu ketik ulang), tapi tetap bisa ketik kategori baru. "Kantor" dan "kantor" dianggap kategori yang sama | "Kantor" |
| Status | Ya, default "Belum" | Belum / Dikerjakan / Selesai. Diubah manual oleh pemilik — sistem tidak pernah mengubahnya sendiri | "Dikerjakan" |
| Catatan | Tidak | Teks bebas tambahan. Harus berisi penunjuk saja (misalnya nomor berkas), bukan salinan langsung data pribadi orang lain — ada pengingat soal ini di dekat kolom isian, tapi pengingat ini sifatnya mengingatkan, bukan mencegah/memblokir | "Lihat berkas No. 042" |
| Dibuat pada | Otomatis dicatat sistem | Kapan tugas ini pertama kali disimpan | 1 Juli 2026, 09:14 |
| Terakhir diubah pada | Otomatis dicatat sistem | Kapan tugas ini terakhir kali diubah (bagian mana pun) | 15 Juli 2026, 20:41 |
| Selesai pada | Otomatis dicatat sistem, kosong kalau belum selesai | Kapan status berubah jadi Selesai. Kosong lagi kalau tandai selesai dibatalkan | 20 Juli 2026, 08:02 |

### Menghapus tugas

Ada dua cara "menghilangkan" tugas, dan efeknya beda:

- **Tandai Selesai** — tugas cuma disembunyikan dari daftar aktif, datanya
  tetap ada dan masih bisa dilihat lewat penyaring status. ini yang dipakai
  untuk pemakaian sehari-hari.
- **Hapus** — tombol terpisah yang harus sengaja ditekan, dan tugas beneran
  hilang dari penyimpanan, tidak bisa dikembalikan lagi.

### Data disimpan berapa lama

Selamanya, tidak ada penghapusan otomatis berdasarkan waktu. Tugas yang sudah
lama selesai tetap ada di penyimpanan sampai memang sengaja dihapus lewat
tombol Hapus.

## Tidak ada tabel untuk data login

Username dan password untuk masuk **tidak disimpan sebagai data di tabel
manapun** — nilainya diset langsung di pengaturan server saat aplikasi
dipasang, bukan lewat aplikasi. Kalau nanti mau ganti username/password,
caranya lewat pengaturan hosting, bukan dari dalam aplikasi.

## Siapa boleh melihat dan mengubah

Aplikasi ini satu pengguna. Begitu berhasil masuk pakai username dan password
yang benar, pemilik bisa melihat dan mengubah semua tugas tanpa kecuali —
tidak ada pembagian hak akses antar tugas karena memang tidak ada pengguna
lain.

## Klasifikasi sensitivitas

- **Data biasa**: nama tugas, batas waktu, level kepentingan, kategori,
  status, dan tanggal-tanggal otomatis.
- **Berpotensi sensitif**: kolom Catatan. Seharusnya cuma berisi penunjuk
  (nomor berkas/referensi), bukan salinan data pribadi orang lain — tapi
  karena ini cuma diingatkan lewat teks di form (bukan dicegah oleh sistem),
  kolom ini tetap diperlakukan sebagai berpotensi memuat data sensitif saat
  bicara soal backup dan siapa yang boleh mengakses server.

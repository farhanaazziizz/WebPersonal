Terakhir diperbarui: 25 Juli 2026

# DESIGN — Aplikasi Manajemen Tugas Pribadi

Panduan konsistensi, bukan spesifikasi desain lengkap. Boleh tumbuh seiring
jalan.

Dipakai dari laptop maupun HP, jadi semua halaman harus nyaman di kedua
ukuran layar sejak awal — bukan versi HP yang dikorbankan belakangan.

## Halaman

| Halaman | Tujuan |
|---|---|
| `/login` | Satu-satunya halaman yang bisa dibuka tanpa login |
| `/` — Fokus Hari Ini | Halaman yang paling sering dibuka. Langsung menampilkan tugas aktif yang sudah terurut otomatis |
| `/tugas` | Daftar lengkap semua tugas, bisa disaring per kategori dan status |

Tambah/ubah tugas **bukan halaman terpisah** — muncul sebagai kotak dialog di
atas halaman manapun (baik dari Fokus Hari Ini maupun daftar lengkap), supaya
tidak memutus alur cuma untuk mencatat satu tugas.

## Navigasi

- Login berhasil → langsung ke `/` (Fokus Hari Ini)
- Dari `/` bisa ke `/tugas` lewat menu, dan sebaliknya
- Tombol "Tambah Tugas" tersedia di `/` maupun `/tugas`, membuka dialog
- Klik satu tugas di daftar manapun → membuka dialog ubah tugas yang sama
- Tombol keluar (logout) tersedia di semua halaman setelah login

## Aksi yang paling sering dilakukan

Buka Fokus Hari Ini, lihat tugas aktif, tandai selesai. Karena ini yang paling
sering terjadi, tandai-selesai **harus bisa dilakukan langsung dari baris
tugas** (misalnya lewat kotak centang), tidak boleh perlu membuka dialog dulu.

## Warna, font, ukuran

- Tidak ada warna atau logo perusahaan yang mengikat — bebas ditentukan saat
  implementasi, asal konsisten dipakai di seluruh aplikasi (satu warna aksen
  untuk tombol utama, dipakai sama di semua halaman).
- Level kepentingan (High/Medium/Low) masing-masing punya warna tetap sendiri
  supaya bisa dikenali sekilas tanpa perlu membaca teksnya — warna pastinya
  ditentukan saat implementasi, asal konsisten dan cukup kontras.
- Satu jenis huruf saja untuk seluruh aplikasi. Ukuran teks ikut skala bawaan
  yang sudah disediakan Tailwind/shadcn, tidak perlu ukuran khusus buatan
  sendiri.

## Komponen shadcn/ui per pola

| Pola | Komponen |
|---|---|
| Daftar tugas | `Table` di layar lebar, berubah jadi susunan `Card` di layar sempit |
| Tandai selesai cepat dari baris | `Checkbox` langsung di baris tugas |
| Tambah/ubah tugas | `Dialog` berisi `Form` — `Input` (nama), kalender untuk batas waktu, `Select` (level kepentingan, status), kombinasi `Select`+ketik bebas (kategori), `Textarea` (catatan) |
| Konfirmasi hapus permanen | `AlertDialog`, wajib ada tombol konfirmasi terpisah — sesuai aturan di SCHEMA.md bahwa hapus harus sengaja |
| Batalkan tandai-selesai, pesan sukses/gagal | `Toast` (Sonner), termasuk tombol "Batalkan" yang tampil beberapa detik setelah tandai selesai |
| Label level kepentingan & kategori di daftar | `Badge` |

## Kondisi loading, kosong, error

- **Loading**: tampilkan bentuk samar dari tabel/kartu (skeleton), bukan
  spinner polos di tengah layar.
- **Kosong**: kalau tidak ada tugas aktif di Fokus Hari Ini, tampilkan pesan
  yang terasa positif (misalnya "Tidak ada tugas aktif hari ini"), bukan
  pesan yang terkesan seperti error.
- **Error**: kalau gagal memuat atau menyimpan, tampilkan pesan singkat yang
  jelas maksudnya plus tombol coba lagi — bukan pesan generik seperti "terjadi
  kesalahan".

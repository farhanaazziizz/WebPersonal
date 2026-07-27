// Jalankan sekali: npx tsx scripts/seed-data-uji-tugas.ts
// Mengisi beberapa baris tugas UJI COBA supaya halaman Fokus Hari Ini bisa
// langsung diperiksa (belum ada form tambah tugas). Semua diberi awalan
// "[Uji]" supaya jelas kelihatan sebagai data percobaan, bukan data asli.
// Untuk membersihkan: npx tsx scripts/hapus-data-uji-tugas.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, LevelKepentingan, StatusTugas } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function hariDariSekarang(hari: number): Date {
  const tanggal = new Date();
  tanggal.setDate(tanggal.getDate() + hari);
  return tanggal;
}

const dataUji = [
  {
    namaTugas: "[Uji] Kirim laporan bulanan ke atasan",
    kategori: "Kantor",
    levelKepentinganAwal: LevelKepentingan.Medium,
    batasWaktu: hariDariSekarang(-6),
    status: StatusTugas.Belum,
  },
  {
    namaTugas: "[Uji] Bayar tagihan listrik",
    kategori: "Rumah",
    levelKepentinganAwal: LevelKepentingan.Low,
    batasWaktu: hariDariSekarang(-2),
    status: StatusTugas.Belum,
  },
  {
    namaTugas: "[Uji] Review dokumen kontrak",
    kategori: "Kantor",
    levelKepentinganAwal: LevelKepentingan.Low,
    batasWaktu: hariDariSekarang(-4),
    status: StatusTugas.Belum,
  },
  {
    namaTugas: "[Uji] Servis motor",
    kategori: "Pribadi",
    levelKepentinganAwal: LevelKepentingan.High,
    batasWaktu: hariDariSekarang(3),
    status: StatusTugas.Belum,
  },
  {
    namaTugas: "[Uji] Susun presentasi klien",
    kategori: "Kantor",
    levelKepentinganAwal: LevelKepentingan.Medium,
    batasWaktu: hariDariSekarang(1),
    status: StatusTugas.Dikerjakan,
  },
  {
    namaTugas: "[Uji] Beli oleh-oleh ulang tahun adik",
    kategori: "Pribadi",
    levelKepentinganAwal: LevelKepentingan.Medium,
    batasWaktu: hariDariSekarang(10),
    status: StatusTugas.Belum,
  },
];

async function main() {
  const hasil = await prisma.tugas.createMany({ data: dataUji });
  console.log(`Berhasil menambah ${hasil.count} tugas uji coba.`);
  await prisma.$disconnect();
}

main();

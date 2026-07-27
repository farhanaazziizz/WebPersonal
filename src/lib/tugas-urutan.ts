import { LevelKepentingan } from "@/generated/prisma/enums";
import type { TugasModel as Tugas } from "@/generated/prisma/models/Tugas";

const URUTAN_LEVEL: LevelKepentingan[] = [
  LevelKepentingan.Low,
  LevelKepentingan.Medium,
  LevelKepentingan.High,
];

// Level kepentingan naik 1 tingkat tiap 3 hari terlambat, maksimal High.
// Keputusan ini diambil bareng pemilik aplikasi (angka pasti tidak
// dirinci di PRD.md, sengaja didiskusikan dulu sebelum modul ini dibangun).
const HARI_PER_KENAIKAN_LEVEL = 3;

export function hitungHariTerlambat(
  batasWaktu: Date,
  sekarang: Date = new Date()
): number {
  const selisihMs = sekarang.getTime() - batasWaktu.getTime();
  if (selisihMs <= 0) return 0;
  return Math.floor(selisihMs / (1000 * 60 * 60 * 24));
}

export function hitungLevelEfektif(
  levelAwal: LevelKepentingan,
  batasWaktu: Date,
  sekarang: Date = new Date()
): LevelKepentingan {
  const hariTerlambat = hitungHariTerlambat(batasWaktu, sekarang);
  const kenaikan = Math.floor(hariTerlambat / HARI_PER_KENAIKAN_LEVEL);
  const indeksAwal = URUTAN_LEVEL.indexOf(levelAwal);
  const indeksEfektif = Math.min(indeksAwal + kenaikan, URUTAN_LEVEL.length - 1);
  return URUTAN_LEVEL[indeksEfektif];
}

export type TugasAktif = Tugas & {
  levelEfektif: LevelKepentingan;
  hariTerlambat: number;
};

export function tambahkanLevelEfektif(
  tugas: Tugas,
  sekarang: Date = new Date()
): TugasAktif {
  return {
    ...tugas,
    levelEfektif: hitungLevelEfektif(tugas.levelKepentinganAwal, tugas.batasWaktu, sekarang),
    hariTerlambat: hitungHariTerlambat(tugas.batasWaktu, sekarang),
  };
}

// Level efektif dulu (High -> Low), lalu dalam level yang sama batas waktu
// paling dekat/paling lama terlambat duluan. Urutan naik biasa berdasarkan
// batasWaktu sudah cukup untuk keduanya sekaligus: due date yang lebih awal
// berarti deadline lebih dekat (untuk yang belum telat) atau telat lebih
// lama (untuk yang sudah telat).
export function urutkanTugasAktif(daftar: TugasAktif[]): TugasAktif[] {
  return [...daftar].sort((a, b) => {
    const bedaLevel =
      URUTAN_LEVEL.indexOf(b.levelEfektif) - URUTAN_LEVEL.indexOf(a.levelEfektif);
    if (bedaLevel !== 0) return bedaLevel;
    return a.batasWaktu.getTime() - b.batasWaktu.getTime();
  });
}

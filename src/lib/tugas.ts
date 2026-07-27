import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { StatusTugas, LevelKepentingan } from "@/generated/prisma/enums";
import { tambahkanLevelEfektif, urutkanTugasAktif, type TugasAktif } from "@/lib/tugas-urutan";

async function pastikanSudahMasuk() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Belum masuk");
  }
}

export async function ambilTugasAktif(): Promise<TugasAktif[]> {
  await pastikanSudahMasuk();

  const sekarang = new Date();
  const tugas = await prisma.tugas.findMany({
    where: { status: { not: StatusTugas.Selesai } },
  });

  return urutkanTugasAktif(tugas.map((t) => tambahkanLevelEfektif(t, sekarang)));
}

const STATUS_VALID: StatusTugas[] = [
  StatusTugas.Belum,
  StatusTugas.Dikerjakan,
  StatusTugas.Selesai,
];

export function statusValid(nilai: unknown): nilai is StatusTugas {
  return typeof nilai === "string" && STATUS_VALID.includes(nilai as StatusTugas);
}

export async function ubahStatusTugas(id: string, statusBaru: StatusTugas) {
  await pastikanSudahMasuk();

  return prisma.tugas.update({
    where: { id },
    data: {
      status: statusBaru,
      selesaiPada: statusBaru === StatusTugas.Selesai ? new Date() : null,
    },
  });
}

const LEVEL_VALID: LevelKepentingan[] = [
  LevelKepentingan.Low,
  LevelKepentingan.Medium,
  LevelKepentingan.High,
];

export function levelValid(nilai: unknown): nilai is LevelKepentingan {
  return typeof nilai === "string" && LEVEL_VALID.includes(nilai as LevelKepentingan);
}

export type DataTugasMasuk = {
  namaTugas: string;
  batasWaktu: Date;
  levelKepentinganAwal: LevelKepentingan;
  kategori: string;
  catatan: string | null;
};

export async function buatTugas(data: DataTugasMasuk) {
  await pastikanSudahMasuk();
  return prisma.tugas.create({ data });
}

export async function ubahTugas(id: string, data: DataTugasMasuk) {
  await pastikanSudahMasuk();
  return prisma.tugas.update({ where: { id }, data });
}

export async function ambilDaftarKategori(): Promise<string[]> {
  await pastikanSudahMasuk();

  const hasil = await prisma.tugas.findMany({
    distinct: ["kategori"],
    select: { kategori: true },
    orderBy: { kategori: "asc" },
  });

  return hasil.map((h) => h.kategori);
}

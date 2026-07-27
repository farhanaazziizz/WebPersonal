import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { StatusTugas } from "@/generated/prisma/enums";
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

import { ambilTugasAktif } from "@/lib/tugas";
import { DaftarTugasAktif } from "@/components/tugas/DaftarTugasAktif";

export default async function FokusHariIniPage() {
  const tugasAktif = await ambilTugasAktif();

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-semibold">Fokus Hari Ini</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tugas aktif, sudah tersusun otomatis berdasarkan tingkat kepentingan dan
        batas waktu.
      </p>
      <div className="mt-6">
        <DaftarTugasAktif tugasAwal={tugasAktif} />
      </div>
    </div>
  );
}

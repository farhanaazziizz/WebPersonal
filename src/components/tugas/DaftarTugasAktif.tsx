"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusTugas, type LevelKepentingan } from "@/generated/prisma/enums";
import { urutkanTugasAktif, type TugasAktif } from "@/lib/tugas-urutan";

const formatTanggal = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const LEVEL_BADGE_CLASS: Record<LevelKepentingan, string> = {
  Low: "border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  Medium: "border-amber-600/30 bg-amber-600/10 text-amber-700 dark:text-amber-400",
  High: "border-red-600/30 bg-red-600/10 text-red-700 dark:text-red-400",
};

async function ubahStatusLewatApi(id: string, status: StatusTugas) {
  const res = await fetch(`/api/tugas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const body: { error?: string } | null = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Gagal menyimpan perubahan.");
  }
}

export function DaftarTugasAktif({ tugasAwal }: { tugasAwal: TugasAktif[] }) {
  const [daftar, setDaftar] = useState(tugasAwal);

  async function tandaiSelesai(tugas: TugasAktif) {
    const statusSebelumnya = tugas.status;
    setDaftar((d) => d.filter((t) => t.id !== tugas.id));

    try {
      await ubahStatusLewatApi(tugas.id, StatusTugas.Selesai);
    } catch (error) {
      setDaftar((d) => urutkanTugasAktif([...d, tugas]));
      toast.error(
        error instanceof Error ? error.message : "Gagal menandai tugas selesai."
      );
      return;
    }

    toast.success(`"${tugas.namaTugas}" ditandai selesai`, {
      action: {
        label: "Batalkan",
        onClick: async () => {
          try {
            await ubahStatusLewatApi(tugas.id, statusSebelumnya);
            setDaftar((d) => urutkanTugasAktif([...d, tugas]));
          } catch {
            toast.error("Gagal membatalkan. Tandai ulang secara manual lewat daftar tugas.");
          }
        },
      },
    });
  }

  if (daftar.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed py-16 text-center">
        <p className="font-medium">Tidak ada tugas aktif hari ini</p>
        <p className="text-sm text-muted-foreground">
          Semua tugas sudah ditandai selesai, atau memang belum ada yang dicatat.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Nama Tugas</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Batas Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {daftar.map((tugas) => (
              <TableRow key={tugas.id}>
                <TableCell>
                  <Checkbox onCheckedChange={() => tandaiSelesai(tugas)} />
                </TableCell>
                <TableCell className="font-medium">{tugas.namaTugas}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{tugas.kategori}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={LEVEL_BADGE_CLASS[tugas.levelEfektif]}>
                    {tugas.levelEfektif}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatTanggal.format(tugas.batasWaktu)}
                  {tugas.hariTerlambat > 0 && (
                    <span className="ml-1.5 text-xs text-red-600 dark:text-red-400">
                      (telat {tugas.hariTerlambat} hari)
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {daftar.map((tugas) => (
          <div key={tugas.id} className="flex items-start gap-3 rounded-lg border p-3">
            <Checkbox className="mt-1" onCheckedChange={() => tandaiSelesai(tugas)} />
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="font-medium">{tugas.namaTugas}</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{tugas.kategori}</Badge>
                <Badge variant="outline" className={LEVEL_BADGE_CLASS[tugas.levelEfektif]}>
                  {tugas.levelEfektif}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatTanggal.format(tugas.batasWaktu)}
                {tugas.hariTerlambat > 0 && (
                  <span className="ml-1.5 text-red-600 dark:text-red-400">
                    (telat {tugas.hariTerlambat} hari)
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

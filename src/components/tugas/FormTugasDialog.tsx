"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LevelKepentingan } from "@/generated/prisma/enums";
import { validasiDataTugas, type HasilValidasiTugas } from "@/lib/tugas-validasi";
import type { TugasAktif } from "@/lib/tugas-urutan";

function tanggalUntukInput(tanggal: Date): string {
  return tanggal.toISOString().slice(0, 10);
}

export function FormTugasDialog({
  open,
  onOpenChange,
  tugas,
  daftarKategori,
  onBerhasil,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tugas: TugasAktif | null;
  daftarKategori: string[];
  onBerhasil: () => void;
}) {
  const modeUbah = tugas !== null;

  const [namaTugas, setNamaTugas] = useState("");
  const [batasWaktu, setBatasWaktu] = useState("");
  const [levelKepentinganAwal, setLevelKepentinganAwal] = useState<LevelKepentingan>(
    LevelKepentingan.Medium
  );
  const [kategori, setKategori] = useState("");
  const [catatan, setCatatan] = useState("");
  const [error, setError] = useState<HasilValidasiTugas["error"]>({});
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  // Isi ulang form setiap dialog dibuka (bukan setiap render) — pola
  // "adjust state saat render" yang direkomendasikan React, bukan Effect.
  const [openSebelumnya, setOpenSebelumnya] = useState(open);
  if (open !== openSebelumnya) {
    setOpenSebelumnya(open);
    if (open) {
      setError({});
      if (tugas) {
        setNamaTugas(tugas.namaTugas);
        setBatasWaktu(tanggalUntukInput(tugas.batasWaktu));
        setLevelKepentinganAwal(tugas.levelKepentinganAwal);
        setKategori(tugas.kategori);
        setCatatan(tugas.catatan ?? "");
      } else {
        setNamaTugas("");
        setBatasWaktu("");
        setLevelKepentinganAwal(LevelKepentingan.Medium);
        setKategori("");
        setCatatan("");
      }
    }
  }

  async function simpan() {
    const validasi = validasiDataTugas({ namaTugas, batasWaktu, kategori });
    setError(validasi.error);
    if (!validasi.valid) return;

    setSedangMenyimpan(true);
    try {
      const url = modeUbah ? `/api/tugas/${tugas.id}` : "/api/tugas";
      const res = await fetch(url, {
        method: modeUbah ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaTugas,
          batasWaktu,
          levelKepentinganAwal,
          kategori,
          catatan,
        }),
      });

      if (!res.ok) {
        const body: { error?: string } | null = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal menyimpan tugas.");
      }

      toast.success(modeUbah ? "Tugas diperbarui" : "Tugas ditambahkan");
      onOpenChange(false);
      onBerhasil();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan tugas.");
    } finally {
      setSedangMenyimpan(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modeUbah ? "Ubah Tugas" : "Tambah Tugas"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="namaTugas">Nama Tugas</Label>
            <Input
              id="namaTugas"
              value={namaTugas}
              onChange={(e) => setNamaTugas(e.target.value)}
              aria-invalid={!!error.namaTugas}
            />
            {error.namaTugas && (
              <p className="text-sm text-destructive">{error.namaTugas}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="batasWaktu">Batas Waktu</Label>
            <Input
              id="batasWaktu"
              type="date"
              value={batasWaktu}
              onChange={(e) => setBatasWaktu(e.target.value)}
              aria-invalid={!!error.batasWaktu}
            />
            {error.batasWaktu && (
              <p className="text-sm text-destructive">{error.batasWaktu}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="levelKepentingan">Level Kepentingan</Label>
            <Select
              value={levelKepentinganAwal}
              onValueChange={(nilai) =>
                setLevelKepentinganAwal(nilai as LevelKepentingan)
              }
            >
              <SelectTrigger id="levelKepentingan" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={LevelKepentingan.Low}>Low</SelectItem>
                <SelectItem value={LevelKepentingan.Medium}>Medium</SelectItem>
                <SelectItem value={LevelKepentingan.High}>High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kategori">Kategori</Label>
            <Input
              id="kategori"
              list="daftar-kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              aria-invalid={!!error.kategori}
              placeholder="Contoh: Kantor"
            />
            <datalist id="daftar-kategori">
              {daftarKategori.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>
            {error.kategori && (
              <p className="text-sm text-destructive">{error.kategori}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="catatan">Catatan (opsional)</Label>
            <Textarea
              id="catatan"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Cukup penunjuk singkat, bukan salinan data pribadi orang lain"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={sedangMenyimpan}
          >
            Batal
          </Button>
          <Button type="button" onClick={simpan} disabled={sedangMenyimpan}>
            {sedangMenyimpan ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

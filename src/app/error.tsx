"use client";

import { Button } from "@/components/ui/button";

export default function ErrorFokusHariIni({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <p className="font-medium">Gagal memuat tugas</p>
      <p className="text-sm text-muted-foreground">
        Terjadi masalah saat mengambil data. Coba lagi, atau periksa koneksi ke
        database.
      </p>
      <Button onClick={() => reset()}>Coba lagi</Button>
    </div>
  );
}

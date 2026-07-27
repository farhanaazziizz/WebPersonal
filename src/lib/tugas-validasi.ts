export type InputTugas = {
  namaTugas: string;
  batasWaktu: string; // format "YYYY-MM-DD" dari <input type="date">
  kategori: string;
};

export type HasilValidasiTugas = {
  valid: boolean;
  error: Partial<Record<keyof InputTugas, string>>;
};

export function validasiDataTugas(input: InputTugas): HasilValidasiTugas {
  const error: HasilValidasiTugas["error"] = {};

  if (!input.namaTugas.trim()) {
    error.namaTugas = "Nama tugas wajib diisi.";
  }

  if (!input.batasWaktu) {
    error.batasWaktu = "Batas waktu wajib diisi.";
  } else if (Number.isNaN(new Date(input.batasWaktu).getTime())) {
    error.batasWaktu = "Batas waktu tidak valid.";
  }

  if (!input.kategori.trim()) {
    error.kategori = "Kategori wajib diisi.";
  }

  return { valid: Object.keys(error).length === 0, error };
}

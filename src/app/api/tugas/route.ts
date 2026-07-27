import { NextResponse } from "next/server";
import { LevelKepentingan } from "@/generated/prisma/enums";
import { buatTugas, levelValid } from "@/lib/tugas";
import { validasiDataTugas } from "@/lib/tugas-validasi";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  const data = body as {
    namaTugas?: unknown;
    batasWaktu?: unknown;
    levelKepentinganAwal?: unknown;
    kategori?: unknown;
    catatan?: unknown;
  } | null;

  const namaTugas = typeof data?.namaTugas === "string" ? data.namaTugas : "";
  const batasWaktu = typeof data?.batasWaktu === "string" ? data.batasWaktu : "";
  const kategori = typeof data?.kategori === "string" ? data.kategori : "";
  const catatan = typeof data?.catatan === "string" ? data.catatan : "";
  const levelKepentinganAwal = data?.levelKepentinganAwal ?? LevelKepentingan.Medium;

  const validasi = validasiDataTugas({ namaTugas, batasWaktu, kategori });
  if (!validasi.valid) {
    return NextResponse.json(
      { error: "Data tugas belum lengkap atau valid.", detail: validasi.error },
      { status: 400 }
    );
  }
  if (!levelValid(levelKepentinganAwal)) {
    return NextResponse.json(
      { error: "Level kepentingan tidak valid." },
      { status: 400 }
    );
  }

  try {
    const tugas = await buatTugas({
      namaTugas: namaTugas.trim(),
      batasWaktu: new Date(batasWaktu),
      levelKepentinganAwal,
      kategori: kategori.trim(),
      catatan: catatan.trim() || null,
    });
    return NextResponse.json({ tugas }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Belum masuk") {
      return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
    }
    console.error("[api/tugas POST]", error);
    return NextResponse.json(
      { error: "Gagal menyimpan tugas." },
      { status: 500 }
    );
  }
}

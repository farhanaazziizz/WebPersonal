import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { LevelKepentingan } from "@/generated/prisma/enums";
import { statusValid, levelValid, ubahStatusTugas, ubahTugas } from "@/lib/tugas";
import { validasiDataTugas } from "@/lib/tugas-validasi";

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "Belum masuk") {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return NextResponse.json({ error: "Tugas tidak ditemukan." }, { status: 404 });
  }
  console.error("[api/tugas/:id PATCH]", error);
  return NextResponse.json({ error: "Gagal menyimpan perubahan." }, { status: 500 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  // Ubah status saja — dipakai checkbox tandai-selesai di Fokus Hari Ini.
  if ("status" in body) {
    const status = (body as { status?: unknown }).status;
    if (!statusValid(status)) {
      return NextResponse.json(
        { error: "Status tugas tidak valid." },
        { status: 400 }
      );
    }

    try {
      const tugas = await ubahStatusTugas(id, status);
      return NextResponse.json({ tugas });
    } catch (error) {
      return errorResponse(error);
    }
  }

  // Ubah data tugas lengkap — dipakai form ubah tugas.
  const data = body as {
    namaTugas?: unknown;
    batasWaktu?: unknown;
    levelKepentinganAwal?: unknown;
    kategori?: unknown;
    catatan?: unknown;
  };

  const namaTugas = typeof data.namaTugas === "string" ? data.namaTugas : "";
  const batasWaktu = typeof data.batasWaktu === "string" ? data.batasWaktu : "";
  const kategori = typeof data.kategori === "string" ? data.kategori : "";
  const catatan = typeof data.catatan === "string" ? data.catatan : "";
  const levelKepentinganAwal = data.levelKepentinganAwal ?? LevelKepentingan.Medium;

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
    const tugas = await ubahTugas(id, {
      namaTugas: namaTugas.trim(),
      batasWaktu: new Date(batasWaktu),
      levelKepentinganAwal,
      kategori: kategori.trim(),
      catatan: catatan.trim() || null,
    });
    return NextResponse.json({ tugas });
  } catch (error) {
    return errorResponse(error);
  }
}

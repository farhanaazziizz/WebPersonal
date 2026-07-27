import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { statusValid, ubahStatusTugas } from "@/lib/tugas";

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

  const status = (body as { status?: unknown } | null)?.status;
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
    if (error instanceof Error && error.message === "Belum masuk") {
      return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Tugas tidak ditemukan." },
        { status: 404 }
      );
    }
    console.error("[api/tugas/:id PATCH]", error);
    return NextResponse.json(
      { error: "Gagal menyimpan perubahan." },
      { status: 500 }
    );
  }
}

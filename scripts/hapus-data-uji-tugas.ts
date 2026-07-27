// Jalankan sekali: npx tsx scripts/hapus-data-uji-tugas.ts
// Menghapus permanen semua tugas yang namanya berawalan "[Uji]" —
// pasangan dari scripts/seed-data-uji-tugas.ts.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hasil = await prisma.tugas.deleteMany({
    where: { namaTugas: { startsWith: "[Uji]" } },
  });
  console.log(`Berhasil menghapus ${hasil.count} tugas uji coba.`);
  await prisma.$disconnect();
}

main();

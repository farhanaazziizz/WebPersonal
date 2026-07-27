-- CreateEnum
CREATE TYPE "LevelKepentingan" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "StatusTugas" AS ENUM ('Belum', 'Dikerjakan', 'Selesai');

-- CreateTable
CREATE TABLE "Tugas" (
    "id" TEXT NOT NULL,
    "namaTugas" TEXT NOT NULL,
    "batasWaktu" TIMESTAMP(3) NOT NULL,
    "levelKepentinganAwal" "LevelKepentingan" NOT NULL DEFAULT 'Medium',
    "kategori" TEXT NOT NULL,
    "status" "StatusTugas" NOT NULL DEFAULT 'Belum',
    "catatan" TEXT,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "terakhirDiubahPada" TIMESTAMP(3) NOT NULL,
    "selesaiPada" TIMESTAMP(3),

    CONSTRAINT "Tugas_pkey" PRIMARY KEY ("id")
);

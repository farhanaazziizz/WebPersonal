// Dijalankan sendiri di terminal kamu: node scripts/buat-hash-password.mjs
// Password yang diketik di sini TIDAK pernah dikirim ke mana pun — cuma diproses
// di komputer kamu sendiri untuk dibuatkan hash-nya.

import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({ input: stdin, output: stdout });

const password = await rl.question(
  "Ketik password yang mau dipakai untuk login lalu Enter: "
);
rl.close();

if (!password) {
  console.error("Password tidak boleh kosong.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
// Next.js meng-ekspansi "$NAMA" di .env sebagai variabel — hash bcrypt selalu
// mengandung "$" (contoh: $2b$12$...), jadi harus di-escape jadi "\$" di .env,
// kalau tidak sebagian hash akan diam-diam terpotong dan login gagal terus
// tanpa pesan error yang jelas.
const hashUntukEnv = hash.replace(/\$/g, "\\$");

console.log("\nTempel dua baris ini ke file .env (ganti kalau sudah ada baris yang sama):\n");
console.log(`APP_USERNAME="ganti-dengan-username-pilihanmu"`);
console.log(`APP_PASSWORD_HASH="${hashUntukEnv}"`);

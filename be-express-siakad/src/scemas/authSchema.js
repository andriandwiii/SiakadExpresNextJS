import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: z.enum([
    "SUPER_ADMIN",
    "KURIKULUM",
    "KESISWAAN",
    "KEUANGAN",
    "TU_TASM",
    "BP_BKM",
    "ADMIN_WEB",
    "GURU",
    "SISWA"
  ], "Role tidak valid").default("SISWA"),
});

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

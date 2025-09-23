import { db } from "../core/config/knex.js"; // Ensure the correct path

// Get all siswa
export const getAllMasterSiswa = async () => db("master_siswa").select("*");

// Get siswa by ID
export const getMasterSiswaById = async (id) =>
  db("master_siswa").where({ SISWA_ID: id }).first();

// Get siswa by NIS
export const getMasterSiswaByNis = async (nis) =>
  db("master_siswa").where({ NIS: nis }).first();

// Create new siswa
export const addMasterSiswa = async ({
  NIS,
  NISN,
  NAMA,
  GENDER,
  TGL_LAHIR,
  STATUS,
  EMAIL,
}) => {
  const [id] = await db("master_siswa").insert({
    NIS,
    NISN,
    NAMA,
    GENDER,
    TGL_LAHIR,
    STATUS,
    EMAIL,
  });
  return db("master_siswa").where({ SISWA_ID: id }).first();
};

// Update siswa
export const updateMasterSiswa = async (
  id,
  { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL }
) => {
  await db("master_siswa")
    .where({ SISWA_ID: id })
    .update({ NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL });
  return db("master_siswa").where({ SISWA_ID: id }).first();
};

// Delete siswa
export const deleteMasterSiswa = async (id) =>
  db("master_siswa").where({ SISWA_ID: id }).del();

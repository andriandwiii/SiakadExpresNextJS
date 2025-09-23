import { db } from "../core/config/knex.js";

<<<<<<< HEAD
/**
 * Get all guru
 **/
export const getAllGuru = async () => db("master_guru").select("*");

/**
 * Get guru by ID
 **/
export const getGuruById = async (id) =>
  db("master_guru").where({ GURU_ID: id }).first();

/**
 * Get guru by NIP
 **/
export const getGuruByNip = async (nip) =>
  db("master_guru").where({ NIP: nip }).first();

/**
 * Create new guru
 **/
export const createGuru = async ({
  NIP,
  NAMA,
  GELAR,
  PANGKAT,
  JABATAN,
}) => {
  const [id] = await db("master_guru").insert({
    NIP,
    NAMA,
    GELAR,
    PANGKAT,
    JABATAN,
  });
  return db("master_guru").where({ GURU_ID: id }).first();
};

/**
 * Update guru
 **/
export const updateGuru = async (
  id,
  { NIP, NAMA, GELAR, PANGKAT, JABATAN }
) => {
  await db("master_guru")
    .where({ GURU_ID: id })
    .update({ NIP, NAMA, GELAR, PANGKAT, JABATAN });
  return db("master_guru").where({ GURU_ID: id }).first();
};

/**
 * Delete guru
 **/
export const deleteGuru = async (id) =>
=======
// Ambil semua guru
export const getAllGuru = async () => db("master_guru").select("*");

// Ambil guru berdasarkan ID
export const getGuruById = async (id) => db("master_guru").where({ GURU_ID: id }).first();

// Ambil guru berdasarkan NIP
export const getGuruByNip = async (nip) => db("master_guru").where({ NIP: nip }).first();

// Tambah guru baru
export const addGuru = async ({ nip, nama, gelar, pangkat, jabatan }) => {
  const [GURU_ID] = await db("master_guru").insert({
    NIP: nip,
    NAMA: nama,
    GELAR: gelar,
    PANGKAT: pangkat,
    JABATAN: jabatan,
  });
  return db("master_guru").where({ GURU_ID }).first();
};

// Update guru
export const updateGuru = async (id, data) =>
  db("master_guru")
    .where({ GURU_ID: id })
    .update({
      NIP: data.nip,
      NAMA: data.nama,
      GELAR: data.gelar,
      PANGKAT: data.pangkat,
      JABATAN: data.jabatan,
      updated_at: db.fn.now(),
    })
    .returning("*");

// Hapus guru
export const removeGuru = async (id) =>
>>>>>>> b2bea1ff1b9903ad19048bb5e08082770b70c17c
  db("master_guru").where({ GURU_ID: id }).del();

import {
  getAllGuru,
  getGuruById,
  addGuru,
  updateGuru,
  removeGuru,
} from "../models/masterGuruModel.js";

import {
  addMasterGuruSchema,
  updateMasterGuruSchema,
} from "../scemas/masterGuruSchema.js";

import { datetime, status } from "../utils/general.js";

// =======================
// Fetch all guru
// =======================
export const fetchAllGuru = async (req, res) => {
  try {
    const guru = await getAllGuru();

    if (!guru || guru.length === 0) {
      return res.status(404).json({
        status: status.NOT_FOUND,
        message: "Data guru kosong",
        datetime: datetime(),
      });
    }

    return res.status(200).json({
      status: status.SUKSES,
      message: "Data guru berhasil didapatkan",
      datetime: datetime(),
      guru,
    });
  } catch (error) {
    return res.status(500).json({
      status: status.GAGAL,
      message: `Terjadi kesalahan pada server: ${error.message}`,
      datetime: datetime(),
    });
  }
};

// =======================
// Get guru by ID
// =======================
export const getGuruByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const guru = await getGuruById(id);

    if (!guru) {
      return res.status(404).json({
        status: status.NOT_FOUND,
        message: "Data guru tidak ditemukan",
        datetime: datetime(),
      });
    }

    return res.status(200).json({
      status: status.SUKSES,
      message: "Data guru berhasil didapatkan",
      datetime: datetime(),
      guru,
    });
  } catch (error) {
    return res.status(500).json({
      status: status.GAGAL,
      message: `Terjadi kesalahan pada server: ${error.message}`,
      datetime: datetime(),
    });
  }
};

// =======================
// Create new guru
// =======================
export const createNewGuru = async (req, res) => {
  try {
    const validation = addMasterGuruSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        status: status.BAD_REQUEST,
        message: "Validasi gagal",
        datetime: datetime(),
        errors: validation.error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    const { nip, nama, gelar, pangkat, jabatan } = validation.data;

    const guru = await addGuru({
      nip,
      nama,
      gelar,
      pangkat,
      jabatan,
    });

    return res.status(201).json({
      status: status.SUKSES,
      message: "Guru berhasil ditambahkan",
      datetime: datetime(),
      guru,
    });
  } catch (error) {
    return res.status(500).json({
      status: status.GAGAL,
      message: `Terjadi kesalahan pada server: ${error.message}`,
      datetime: datetime(),
    });
  }
};

// =======================
// Update guru
// =======================
export const updateGuruController = async (req, res) => {
  try {
    const { id } = req.params;
    const validation = updateMasterGuruSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        status: status.BAD_REQUEST,
        message: "Validasi gagal",
        datetime: datetime(),
        errors: validation.error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    const { nip, nama, gelar, pangkat, jabatan } = validation.data;

    await updateGuru(id, { nip, nama, gelar, pangkat, jabatan });

    const updatedGuru = await getGuruById(id);

    return res.status(200).json({
      status: status.SUKSES,
      message: "Guru berhasil diupdate",
      datetime: datetime(),
      guru: updatedGuru,
    });
  } catch (error) {
    return res.status(500).json({
      status: status.GAGAL,
      message: `Terjadi kesalahan pada server: ${error.message}`,
      datetime: datetime(),
    });
  }
};

// =======================
// Delete guru
// =======================
export const deleteGuruController = async (req, res) => {
  try {
    const { id } = req.params;

    await removeGuru(id);

    return res.status(200).json({
      status: status.SUKSES,
      message: "Guru berhasil dihapus",
      datetime: datetime(),
    });
  } catch (error) {
    return res.status(500).json({
      status: status.GAGAL,
      message: `Terjadi kesalahan pada server: ${error.message}`,
      datetime: datetime(),
    });
  }
};

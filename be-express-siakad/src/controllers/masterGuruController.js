<<<<<<< HEAD
import * as MasterGuruModel from "../models/masterGuruModel.js";

/**
 * Ambil semua data guru
 */
export const getAllGuru = async (req, res) => {
  try {
    const guru = await MasterGuruModel.getAllGuru();
    res.status(200).json(guru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Ambil guru berdasarkan ID
 */
export const getGuruById = async (req, res) => {
  try {
    const guru = await MasterGuruModel.getGuruById(req.params.id);
    if (!guru) {
      return res.status(404).json({ message: "Guru tidak ditemukan" });
    }
    res.status(200).json(guru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Tambah guru baru
 */
export const createGuru = async (req, res) => {
  try {
    const { NIP, NAMA, GELAR, PANGKAT, JABATAN } = req.body;

    if (!NIP || !NAMA) {
      return res.status(400).json({ message: "NIP dan NAMA wajib diisi" });
    }

    const newGuru = await MasterGuruModel.createGuru({
      NIP,
      NAMA,
      GELAR,
      PANGKAT,
      JABATAN,
    });

    res.status(201).json(newGuru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update guru berdasarkan ID
 */
export const updateGuru = async (req, res) => {
  try {
    const { NIP, NAMA, GELAR, PANGKAT, JABATAN } = req.body;

    const updatedGuru = await MasterGuruModel.updateGuru(req.params.id, {
      NIP,
      NAMA,
      GELAR,
      PANGKAT,
      JABATAN,
    });

    if (!updatedGuru) {
      return res.status(404).json({ message: "Guru tidak ditemukan" });
    }

    res.status(200).json(updatedGuru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Hapus guru berdasarkan ID
 */
export const deleteGuru = async (req, res) => {
  try {
    const deleted = await MasterGuruModel.deleteGuru(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Guru tidak ditemukan" });
    }

    res.status(200).json({ message: "Guru berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
=======
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
>>>>>>> b2bea1ff1b9903ad19048bb5e08082770b70c17c
  }
};

<<<<<<< HEAD
import * as MasterMapelModel from "../models/masterMapelModel.js";

/**
 * Ambil semua mata pelajaran
 */
export const getAllMapel = async (req, res) => {
  try {
    const mapel = await MasterMapelModel.getAllMapel();
    res.status(200).json(mapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Ambil mata pelajaran berdasarkan ID
 */
export const getMapelById = async (req, res) => {
  try {
    const mapel = await MasterMapelModel.getMapelById(req.params.id);
    if (!mapel) {
      return res.status(404).json({ message: "Mata pelajaran tidak ditemukan" });
    }
    res.status(200).json(mapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Tambah mata pelajaran baru
 */
export const createMapel = async (req, res) => {
  try {
    const { KODE_MAPEL, NAMA_MAPEL, DESKRIPSI, KATEGORI, STATUS } = req.body;

    if (!KODE_MAPEL || !NAMA_MAPEL || !KATEGORI) {
      return res.status(400).json({ message: "KODE_MAPEL, NAMA_MAPEL, dan KATEGORI wajib diisi" });
    }

    const newMapel = await MasterMapelModel.createMapel({
      KODE_MAPEL,
      NAMA_MAPEL,
      DESKRIPSI,
      KATEGORI,
      STATUS,
    });

    res.status(201).json(newMapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update mata pelajaran berdasarkan ID
 */
export const updateMapel = async (req, res) => {
  try {
    const { KODE_MAPEL, NAMA_MAPEL, DESKRIPSI, KATEGORI, STATUS } = req.body;

    const updatedMapel = await MasterMapelModel.updateMapel(req.params.id, {
      KODE_MAPEL,
      NAMA_MAPEL,
      DESKRIPSI,
      KATEGORI,
      STATUS,
    });

    if (!updatedMapel) {
      return res.status(404).json({ message: "Mata pelajaran tidak ditemukan" });
    }

    res.status(200).json(updatedMapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Hapus mata pelajaran berdasarkan ID
 */
export const deleteMapel = async (req, res) => {
  try {
    const deleted = await MasterMapelModel.deleteMapel(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Mata pelajaran tidak ditemukan" });
    }

    res.status(200).json({ message: "Mata pelajaran berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
=======
import {
  getAllMapel,
  getMapelById,
  addMapel,
  updateMapel,
  removeMapel,
} from "../models/masterMapelModel.js";

import {
  addMasterMapelSchema,
  updateMasterMapelSchema,
} from "../scemas/masterMapelSchema.js";

import { datetime, status } from "../utils/general.js";

// =======================
// Fetch all mapel
// =======================
export const fetchAllMapel = async (req, res) => {
  try {
    const mapel = await getAllMapel();

    if (!mapel || mapel.length === 0) {
      return res.status(404).json({
        status: status.NOT_FOUND,
        message: "Data mata pelajaran kosong",
        datetime: datetime(),
      });
    }

    return res.status(200).json({
      status: status.SUKSES,
      message: "Data mata pelajaran berhasil didapatkan",
      datetime: datetime(),
      mapel,
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
// Get mapel by ID
// =======================
export const getMapelByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const mapel = await getMapelById(id);

    if (!mapel) {
      return res.status(404).json({
        status: status.NOT_FOUND,
        message: "Data mata pelajaran tidak ditemukan",
        datetime: datetime(),
      });
    }

    return res.status(200).json({
      status: status.SUKSES,
      message: "Data mata pelajaran berhasil didapatkan",
      datetime: datetime(),
      mapel,
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
// Create new mapel
// =======================
export const createNewMapel = async (req, res) => {
  try {
    const validation = addMasterMapelSchema.safeParse(req.body);

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

    const { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS: mapelStatus } = validation.data;

    const mapel = await addMapel({
      KODE_MAPEL,
      NAMA_MAPEL,
      KATEGORI,
      STATUS: mapelStatus,
    });

    return res.status(201).json({
      status: status.SUKSES,
      message: "Mata pelajaran berhasil ditambahkan",
      datetime: datetime(),
      mapel,
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
// Update mapel
// =======================
export const updateMapelController = async (req, res) => {
  try {
    const { id } = req.params;
    const validation = updateMasterMapelSchema.safeParse(req.body);

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

    const { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS: mapelStatus } = validation.data;

    await updateMapel(id, {
      KODE_MAPEL,
      NAMA_MAPEL,
      KATEGORI,
      STATUS: mapelStatus,
    });

    const updatedMapel = await getMapelById(id);

    return res.status(200).json({
      status: status.SUKSES,
      message: "Mata pelajaran berhasil diupdate",
      datetime: datetime(),
      mapel: updatedMapel,
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
// Delete mapel
// =======================
export const deleteMapelController = async (req, res) => {
  try {
    const { id } = req.params;

    await removeMapel(id);

    return res.status(200).json({
      status: status.SUKSES,
      message: "Mata pelajaran berhasil dihapus",
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

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
  }
};

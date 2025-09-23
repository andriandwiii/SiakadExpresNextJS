import * as masterSiswaModel from "../models/masterSiswaModel.js"; // Ensure the correct path

export const getAllMasterSiswa = async (req, res) => {
  try {
    const siswa = await masterSiswaModel.getAllMasterSiswa();
    res.json(siswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMasterSiswaById = async (req, res) => {
  try {
    const siswa = await masterSiswaModel.getMasterSiswaById(req.params.id);
    if (!siswa) return res.status(404).json({ message: "Master siswa tidak ditemukan" });
    res.json(siswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMasterSiswa = async (req, res) => {
  try {
    const { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL } = req.body;
    const newSiswa = await masterSiswaModel.addMasterSiswa({
      NIS,
      NISN,
      NAMA,
      GENDER,
      TGL_LAHIR,
      STATUS,
      EMAIL,
    });
    res.status(201).json(newSiswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMasterSiswa = async (req, res) => {
  try {
    const { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL } = req.body;
    const updatedSiswa = await masterSiswaModel.updateMasterSiswa(req.params.id, {
      NIS,
      NISN,
      NAMA,
      GENDER,
      TGL_LAHIR,
      STATUS,
      EMAIL,
    });
    res.json(updatedSiswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMasterSiswa = async (req, res) => {
  try {
    await masterSiswaModel.deleteMasterSiswa(req.params.id);
    res.json({ message: "Master siswa berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

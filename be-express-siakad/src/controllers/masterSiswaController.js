import * as masterKelasModel from "../models/masterKelasModel.js"; // Pastikan path ini sesuai

// Mendapatkan semua data kelas
export const fetchAllKelas = async (req, res) => {
  try {
    const kelas = await masterKelasModel.fetchAllKelas();
    res.json(kelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan kelas berdasarkan ID
export const getKelasByIdController = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    const kelas = await masterKelasModel.getKelasById(id);

    if (!kelas) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }

    res.json(kelas); // Mengembalikan data kelas
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Menambahkan kelas baru
export const createNewKelas = async (req, res) => {
  const { KODE_KELAS, NAMA_KELAS, JURUSAN, TAHUN_AJARAN } = req.body;

  try {
    const newKelas = await masterKelasModel.createNewKelas({ KODE_KELAS, NAMA_KELAS, JURUSAN, TAHUN_AJARAN });
    res.status(201).json(newKelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Memperbarui data kelas
export const updateKelasController = async (req, res) => {
  const { KODE_KELAS, NAMA_KELAS, JURUSAN, TAHUN_AJARAN } = req.body;

  try {
    const updatedKelas = await masterKelasModel.updateKelas(req.params.id, { KODE_KELAS, NAMA_KELAS, JURUSAN, TAHUN_AJARAN });
    res.json(updatedKelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Menghapus kelas berdasarkan ID
export const deleteKelasController = async (req, res) => {
  try {
    await masterKelasModel.deleteKelas(req.params.id);
    res.json({ message: "Kelas berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

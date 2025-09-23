import express from "express";
import {
  fetchAllGuru,
  getGuruByIdController,
  createNewGuru,
  updateGuruController,
  deleteGuruController,
} from "../controllers/masterGuruController.js";

const router = express.Router();

// GET semua guru
router.get("/", fetchAllGuru);

// GET guru by ID
router.get("/:id", getGuruByIdController);

// POST tambah guru
router.post("/", createNewGuru);

// PUT update guru
router.put("/:id", updateGuruController);

// DELETE hapus guru
router.delete("/:id", deleteGuruController);

export default router;

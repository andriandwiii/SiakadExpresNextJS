<<<<<<< HEAD
import { Router } from "express";
import * as MasterGuruController from "../controllers/masterGuruController.js";

const router = Router();

// GET all guru
router.get("/", MasterGuruController.getAllGuru);

// GET guru by ID
router.get("/:id", MasterGuruController.getGuruById);

// POST new guru
router.post("/", MasterGuruController.createGuru);

// PUT update guru
router.put("/:id", MasterGuruController.updateGuru);

// DELETE guru
router.delete("/:id", MasterGuruController.deleteGuru);
=======
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
>>>>>>> b2bea1ff1b9903ad19048bb5e08082770b70c17c

export default router;

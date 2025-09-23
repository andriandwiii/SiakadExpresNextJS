import { Router } from "express";
import * as masterSiswaController from "../controllers/masterSiswaController.js"; // Ensure this path is correct

const router = Router();

// Route to get all siswa
router.get("/", masterSiswaController.getAllMasterSiswa);

// Route to get a siswa by ID
router.get("/:id", masterSiswaController.getMasterSiswaById);

// Route to add a new siswa
router.post("/", masterSiswaController.addMasterSiswa);

// Route to update a siswa by ID
router.put("/:id", masterSiswaController.updateMasterSiswa);

// Route to delete a siswa by ID
router.delete("/:id", masterSiswaController.deleteMasterSiswa);

export default router;

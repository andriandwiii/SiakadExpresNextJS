import { Router } from "express";
import * as masterSiswaController from "../controllers/masterSiswaController.js"; // Updated to masterSiswaController

const router = Router();

router.get("/", masterSiswaController.getAllMasterSiswa);

router.get("/:id", masterSiswaController.getMasterSiswaById);

router.post("/", masterSiswaController.addMasterSiswa);

router.put("/:id", masterSiswaController.updateMasterSiswa);


router.delete("/:id", masterSiswaController.deleteMasterSiswa);

export default router;

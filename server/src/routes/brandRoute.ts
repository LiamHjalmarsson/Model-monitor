import { Router } from "express";
import {
	getBrands,
	createBrand,
	updateBrand,
	deleteBrand,
} from "../controllers/brandController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getBrands);

router.post("/", createBrand);

router.put("/:id", updateBrand);

router.delete("/:id", deleteBrand);

export default router;

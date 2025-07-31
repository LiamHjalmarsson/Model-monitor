import { Router } from "express";
import {
	getBrands,
	createBrand,
	updateBrand,
	deleteBrand,
	getResponsesForBrand,
} from "../controllers/brandController.js";
import authMiddleware from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { brandValidator } from "../validation/brandValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getBrands);

router.post("/", brandValidator, validate, createBrand);

router.get("/:id/responses", getResponsesForBrand);

router.put("/:id", brandValidator, validate, updateBrand);

router.delete("/:id", deleteBrand);

export default router;

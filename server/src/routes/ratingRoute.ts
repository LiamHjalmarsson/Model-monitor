import { Router } from "express";
import {
	getRatings,
	getRatingById,
	createRating,
	updateRating,
} from "../controllers/ratingController.js";
import authMiddleware from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { ratingValidator } from "../validation/ratingValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getRatings);

router.get("/:id", getRatingById);

router.post("/", ratingValidator, validate, createRating);

router.put("/:id", ratingValidator, validate, updateRating);

export default router;

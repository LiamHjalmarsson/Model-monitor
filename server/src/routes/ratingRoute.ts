import { Router } from "express";
import {
	getAllRatings,
	getRatingById,
	createRating,
	updateRating,
} from "../controllers/ratingController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllRatings);

router.get("/:id", getRatingById);

router.post("/", createRating);

router.put("/:id", updateRating);

export default router;

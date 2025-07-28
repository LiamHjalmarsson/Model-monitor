import { Router } from "express";
import {
	getResponsesForBrand,
	getResponseById,
	createResponse,
	generateAIResponse,
} from "../controllers/responseController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/brand/:brand_id", getResponsesForBrand);

router.post("/brand/:brand_id", createResponse);

router.get("/:id", getResponseById);

router.post("/brand/:brand_id/generate", generateAIResponse);

export default router;

import {Router} from "express";
import {
	getResponsesForBrand,
	getResponseById,
	createResponse,
	generateAIResponse,
	getUserOwnedResponseById,
} from "../controllers/responseController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/brands/:brand_id", getResponsesForBrand);

router.post("/brands/:brand_id", createResponse);

router.get("/:id", getResponseById);

router.get("/owned/:id", getUserOwnedResponseById);

router.post("/brands/:brand_id/generate", generateAIResponse);

export default router;

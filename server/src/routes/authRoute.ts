import {Router} from "express";
import {login, logout} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
import {loginValidator} from "../validation/authValidation.js";
import {validate} from "../middleware/validate.js";

const router = Router();

router.post("/login", loginValidator, validate, login);

router.post("/logout", authMiddleware, logout);

export default router;

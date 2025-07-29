import { body } from "express-validator";

export const brandValidator = [
	body("name").notEmpty().withMessage("Name is required"),
	body("prompt").notEmpty().withMessage("Prompt is required"),
];

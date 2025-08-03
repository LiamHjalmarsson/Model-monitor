import {body} from "express-validator";

export const generateResponseValidator = [
	body("prompt").notEmpty().withMessage("Prompt is required"),
	body("brand_id").isInt({gt: 0}).withMessage("A valid brand_id is required"),
];

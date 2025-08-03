import {body} from "express-validator";

export const ratingValidator = [
	body("responseId").isInt({gt: 0}).withMessage("Valid responseId is required"),
	body("rating").isIn([0, 1]).withMessage("Rating must be 0 (bad) or 1 (good)"),
];

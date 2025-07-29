import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId: number): string => {
	return jwt.sign({ userId }, config.jwtSecret, {
		expiresIn: config.jwtExpiresIn,
	});
};

export const verifyToken = (token: string): any => {
	return jwt.verify(token, config.jwtSecret);
};

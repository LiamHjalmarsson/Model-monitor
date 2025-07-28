import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId: number): string => {
	return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): any => {
	return jwt.verify(token, config.jwtSecret);
};

import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";

export interface JWTPayload extends JwtPayload {
	userId: string;
}

export function createJWT(payload: JWTPayload): string {
	return jwt.sign(payload, config.jwtSecret, {
		expiresIn: config.jwtExpiresIn,
	});
}

export function verifyJWT(token: string): JWTPayload {
	return jwt.verify(token, config.jwtSecret) as JWTPayload;
}

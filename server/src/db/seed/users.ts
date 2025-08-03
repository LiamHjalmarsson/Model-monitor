import {hashPassword} from "../../utils/password.js";
import db from "../index.js";

export default async function seedUsers() {
	await db.query(`DROP TABLE IF EXISTS users CASCADE`);

	await db.query(`
			CREATE TABLE users (
				id SERIAL PRIMARY KEY,
				email TEXT UNIQUE NOT NULL,
				password TEXT NOT NULL
			);
		`);

	const hashedPassword = await hashPassword("password");

	await db.query(
		`INSERT INTO users (email, password) VALUES 
			('test@example.com', $1),
			('admin@example.com', $1)`,
		[hashedPassword]
	);
}

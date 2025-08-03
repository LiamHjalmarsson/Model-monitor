import db from "../index.js";
import bcrypt from "bcryptjs";

export default async function seedUsers() {
	await db.query(`DROP TABLE IF EXISTS users CASCADE`);

	await db.query(`
			CREATE TABLE users (
				id SERIAL PRIMARY KEY,
				email TEXT UNIQUE NOT NULL,
				password TEXT NOT NULL
			);
		`);

	const hashed = await bcrypt.hash("password", 10);

	await db.query(
		`INSERT INTO users (email, password) VALUES 
			('test@example.com', $1),
			('admin@example.com', $1)`,
		[hashed]
	);
}

import db from "./index.js";
import bcrypt from "bcryptjs";

async function seed() {
	try {
		await db.query(`DROP TABLE IF EXISTS ratings CASCADE`);

		await db.query(`DROP TABLE IF EXISTS responses CASCADE`);

		await db.query(`DROP TABLE IF EXISTS brands CASCADE`);

		await db.query(`DROP TABLE IF EXISTS users CASCADE`);

		// Create Users
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

		// Create brands
		await db.query(`
			CREATE TABLE brands (
				id SERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				prompt TEXT,
				created_by INTEGER REFERENCES users(id)
			);
		`);

		await db.query(`
			INSERT INTO brands (name, prompt, created_by) VALUES
			('OpenAI', 'How is OpenAI perceived?', 1),
			('Nike', 'How is Nike perceived by Gen Z?', 1)
		`);

		// Create responses
		await db.query(`
			CREATE TABLE responses (
				id SERIAL PRIMARY KEY,
				brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
				created_by INTEGER REFERENCES users(id),
				content TEXT NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`);

		await db.query(`
			INSERT INTO responses (brand_id, created_by, content) VALUES
			(1, 1, 'OpenAI is widely regarded as a leader in AI.'),
			(2, 1, 'Nike remains a top choice among athletes and youth.')
		`);

		// Create ratings
		await db.query(`
			CREATE TABLE ratings (
				id SERIAL PRIMARY KEY,
				response_id INTEGER REFERENCES responses(id) ON DELETE CASCADE,
				rating INTEGER CHECK (rating IN (0, 1)),
				user_id INTEGER REFERENCES users(id),
				CONSTRAINT unique_user_response UNIQUE (user_id, response_id)
			);
		`);

		await db.query(`
			INSERT INTO ratings (response_id, rating, user_id) VALUES
			(1, 1, 1),
			(2, 0, 1)
		`);

		process.exit(0);
	} catch (err) {
		console.error("Seed failed:", err);
		process.exit(1);
	}
}

seed();

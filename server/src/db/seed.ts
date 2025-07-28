import bcrypt from "bcrypt";
import pool, { query } from "./index.js";

async function seed(): Promise<void> {
	try {
		await query(`DROP TABLE IF EXISTS users CASCADE;`);

		await query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

		const plain = "password";

		const saltRounds = 10;

		const hashed: string = await bcrypt.hash(plain, saltRounds);

		const insertSql = `
            INSERT INTO users (email, password)
            VALUES ($1, $2), ($3, $4)
            RETURNING id;
        `;

		const values = ["test@example.com", hashed, "user@example.com", hashed];

		const result = await query<{ id: number }>(insertSql, values);

		console.log(
			"Inserted user IDs:",
			result.rows.map((r) => r.id)
		);
	} catch (err) {
		process.exit(1);
	} finally {
		await pool.end();
	}
}

seed();

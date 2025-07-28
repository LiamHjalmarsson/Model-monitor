import { query } from "./index.js";

const seedBrands = async () => {
	const { rows: users } = await query("SELECT * FROM users LIMIT 2");

	if (users.length < 2) {
		process.exit(1);
	}

	const user1 = users[0];

	const user2 = users[1];

	await query("DROP TABLE IF EXISTS brands CASCADE");

	await query(`
        CREATE TABLE brands (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        prompt TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        );
    `);

	await query(
		`INSERT INTO brands (name, prompt, user_id) VALUES
        ($1, $2, $3),
        ($4, $5, $6),
        ($7, $8, $9)
    `,
		[
			"Nike",
			"How does Nike impact culture?",
			user1.id,
			"IKEA",
			"What makes IKEA sustainable?",
			user1.id,
			"Spotify",
			"How does Spotify recommend music?",
			user2.id,
		]
	);

	process.exit();
};

seedBrands().catch((err) => {
	process.exit(1);
});

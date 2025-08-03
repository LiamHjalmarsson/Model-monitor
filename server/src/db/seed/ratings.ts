import db from "../index.js";

export default async function seedRatings() {
	await db.query(`DROP TABLE IF EXISTS ratings CASCADE`);

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
        (2, 0, 1),
        (3, 1, 2),
        (4, 1, 2)
    `);
}

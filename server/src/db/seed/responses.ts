import db from "../index.js";

export default async function seedResponses() {
	await db.query(`DROP TABLE IF EXISTS responses CASCADE`);

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
        (1, 1, 'OpenAI is a pioneer in artificial intelligence.'),
        (2, 1, 'Nike resonates well with younger generations.'),
        (3, 2, 'Apple empowers artists and designers.'),
        (4, 2, 'IKEA offers accessible design around the world.')
    `);
}

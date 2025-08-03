import db from "../index.js";

export default async function seedBrands() {
	await db.query(`DROP TABLE IF EXISTS brands CASCADE`);

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
        ('Nike', 'How is Nike perceived by Gen Z?', 1),
        ('Apple', 'How does Apple influence creativity?', 2),
        ('IKEA', 'How is IKEA viewed globally?', 2)
    `);
}

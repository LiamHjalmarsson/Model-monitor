import { Pool } from "pg";
import config from "../config/config";

const pool = new Pool({
	user: config.pgUser || "postgres",
	host: config.pgHost || "localhost",
	database: config.pgDb || "model_monitor",
	password: config.pgPassword || "password",
	port: config.pgPort || 5432,
});

export async function query(text: string, params?: unknown[]) {
	return pool.query(text, params);
}

export default pool;

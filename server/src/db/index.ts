import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import config from "../config/config.js";

const poolConfig: PoolConfig = {
	user: config.pgUser,
	host: config.pgHost,
	database: config.pgDb,
	password: config.pgPassword,
	port: config.pgPort,
};

const pool = new Pool(poolConfig);

/**
 * Helper around `pool.query` that lets callers pick the row type.
 */
export async function query<T extends QueryResultRow = any>(
	text: string,
	params: any[] = []
): Promise<QueryResult<T>> {
	return pool.query<T>(text, params);
}

export default pool;

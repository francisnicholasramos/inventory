import {Pool} from "pg";
import 'dotenv/config';

export const pool = new Pool({
    connectionString: process.env.NEON_DB
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);

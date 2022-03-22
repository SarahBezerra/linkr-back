import pg from "pg";
import doteenv from "doteenv";

doteenv.config();

const { Pool }  = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
}

export const connection = new Pool(databaseConfig);
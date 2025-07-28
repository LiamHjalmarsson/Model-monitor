import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    pgHost: string;
    phUser: string;
    pgPassword: string;
    pgDb: string;
    pgPort: number;
    jwtSecret: string;
    jwtExpiresIn: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    pgHost: process.env.POSTGRES_HOST || 'localhost',
    pgDb: process.env.POSTGRES_DB || 'root',
    phUser: process.env.POSTGRES_USER || 'postgrel',
    pgPassword: process.env.POSTGRES_PASSWORD || 'root',
    pgPort: Number(process.env.POSTGRES_PORT) || 5432,
    jwtSecret: process.env.JWT_SECRET || 'root',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || 'root',

};

export default config;
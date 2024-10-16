import * as dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .Env Config
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: __dirname + `/../${envFile}` });
interface Config {
    DB_URL: string;
    PORT: number;
    JWT_SECRET_KEY: string;
    JWT_EXPIRES: string
    SMTP_SERVICE: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_MAIL: string;
    SMTP_PASSWORD: string;
}
let config: Config;

if (process.env.NODE_ENV === 'development') {
    config = {
        DB_URL: process.env.DB_URL,
        PORT: 8000,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRES: String(process.env.JWT_SECRET_KEY),
        SMTP_SERVICE: process.env.SMTP_SERVICE,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_MAIL: process.env.SMTP_MAIL,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    };
} else if (process.env.NODE_ENV === 'production') {
    config = {
        DB_URL: process.env.DB_URL,
        PORT: Number(process.env.PORT),
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRES: String(process.env.JWT_SECRET_KEY),
        SMTP_SERVICE: process.env.SMTP_SERVICE,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_MAIL: process.env.SMTP_MAIL,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    };
} else {
    throw new Error('NODE_ENV is not set to development or production!');
}
export default config;

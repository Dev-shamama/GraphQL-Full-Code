declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DB_URL: string;
            PORT?: string;
            JWT_SECRET_KEY: string;
            JWT_EXPIRES: string;
            SMTP_SERVICE: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_MAIL: string;
            SMTP_PASSWORD: string;
        }
    }
}

export { }
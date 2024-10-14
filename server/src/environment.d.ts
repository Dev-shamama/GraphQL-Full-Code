declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DB_URL: string;
            PORT?: string;
            JWT_SECRET_KEY: string;
        }
    }
}

export { }
import 'dotenv/config';
import z from 'zod';

const envVars = z.object({
    MONGO_URI: z.string(),
    PORT: z.string(),
    JWT_SECRET: z.string(),
});

envVars.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVars> { }
    }
}
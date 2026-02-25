import './config/env.config.js';
import express from 'express';
import type { Application, Request, Response } from 'express';
import authRouter from './routes/auth.router.js';
import { connectDB } from './config/db.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor con TS funcionando');
});
app.use('/api/auth', authRouter);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
import './config/env.config.js';
import express from 'express';
import type { Application, Request, Response } from 'express';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import expeseRouter from './routes/expense.routes.js';
import categoryRouter from './routes/category.routes.js';
import { connectDB } from './config/db.js';

import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor con TS funcionando');
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/expenses', expeseRouter);
app.use('/api/categories', categoryRouter);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
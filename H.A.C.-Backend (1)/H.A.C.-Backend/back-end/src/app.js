import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import produtoRoutes from './routes/produtoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));

app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);

app.use(errorMiddleware);

export default app;

console.log("JWT_SECRET:", process.env.JWT_SECRET);
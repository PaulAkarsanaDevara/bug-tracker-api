import 'reflect-metadata'; 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler } from './utils/error';
import userRoutes from './modules/users/user.route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
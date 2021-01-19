import express, { Application } from 'express';
import cors from 'cors';
import process from 'process';
import { routes } from './routes';
export const app: Application = express();

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

app.use(express.json());
app.use(cors());
routes(app);

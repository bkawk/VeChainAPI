import express, { Application } from 'express';
import cors from 'cors';
import { routes } from './routes';
export const app: Application = express();

app.use(express.json());
app.use(cors());
routes(app);
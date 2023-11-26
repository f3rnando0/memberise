import morgan from 'morgan';
import 'express-async-errors';
import routes from './app/routes';
import express from 'express';
import cors from 'cors';
import { error_middleware } from './app/middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('combined'));

app.use('/api/v1', routes);

app.use(error_middleware);

export default app;

import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasksRoutes.js';
import parseRoutes from './routes/parseRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoutes);
app.use('/api/parse', parseRoutes);

export default app;
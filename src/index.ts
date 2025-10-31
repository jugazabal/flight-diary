import express from 'express';
import { ValidationError } from './utils';
import cors from 'cors';
import diaryRouter from './routes/diaries';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

// Serve frontend static files when built (optional)
import path from 'path';
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));
app.get('/', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// SPA fallback: serve index.html for any non-API route (so client-side routing works)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// error handling middleware (should be after routes)
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  if (error instanceof ValidationError) {
    return res.status(400).send({ error: error.message, issues: error.issues });
  }

  if (error instanceof Error) {
    return res.status(400).send({ error: error.message });
  }

  return res.status(500).send({ error: 'Unknown error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
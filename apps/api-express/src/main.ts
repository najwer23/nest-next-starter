import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT ?? '3002', 10);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ service: 'api-express', status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`[api-express] Server running on http://localhost:${PORT}`);
});

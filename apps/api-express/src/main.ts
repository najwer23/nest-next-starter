import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT ?? '3002', 10);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api-express] Server running on http://localhost:${PORT}`);
});

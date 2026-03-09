import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'candidate-service' });
});

// Candidate Profile Routes
app.get('/api/candidates', async (req, res) => {
  // TODO: Fetch all candidates using Prisma
  res.json({ success: true, candidates: [] });
});

app.get('/api/candidates/:id', async (req, res) => {
  const { id } = req.params;
  // TODO: Fetch candidate by ID
  res.json({ success: true, candidate: { id, name: "Sample Candidate" } });
});

app.listen(PORT, () => {
  console.log(`Candidate Service is running on port ${PORT}`);
});

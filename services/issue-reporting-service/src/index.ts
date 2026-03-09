import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApiResponse } from 'eloktantra-types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'issue-reporting-service' });
});

// Civic Issue Reporting Routes
app.post('/api/issues', async (req, res) => {
  const { location, issue_type, description, reported_by_uuid } = req.body;
  // TODO: Create issue in Prisma
  const response: ApiResponse = { success: true, message: 'Issue reported successfully' };
  res.json(response);
});

app.get('/api/issues', async (req, res) => {
  // TODO: Fetch all reported issues
  res.json({ success: true, issues: [] });
});

app.listen(PORT, () => {
  console.log(`Issue Reporting Service is running on port ${PORT}`);
});

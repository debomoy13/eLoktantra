import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRole } from 'eloktantra-types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'auth-service' });
});

// Auth Routes (Scaffold)
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, constituency } = req.body;
  // TODO: Use Prisma (shared-db) to create user
  res.json({ success: true, message: 'User registered' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // TODO: Verify credentials with Prisma
  const token = jwt.sign({ id: '1', email, role: UserRole.CITIZEN }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ success: true, token });
});

app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});

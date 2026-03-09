# eLoktantra - Civic Tech Platform

eLoktantra is a scalable platform for election transparency and civic participation in India.

## Project Structure

- `apps/web`: Next.js Frontend (Next.js 14, TypeScript, TailwindCSS)
- `services/*`: Microservices (Auth, Candidate, Manifesto, Issue Reporting, etc.)
- `shared/types`: Shared TypeScript definitions
- `shared/db`: Prisma schema and database migrations
- `shared/config`: Common configuration and environment management

## Tech Stack

- **Frontend**: Next.js (App Router), TailwindCSS, ShadCN UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT-based roll-based access
- **DevOps**: Docker, Docker Compose

## Quick Start (Local Development)

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Copy `.env.example` to `.env` and fill in your details.

3. **Database Setup**

   ```bash
   npm run db:generate --workspace shared-db
   # After starting PostgreSQL
   npm run db:push --workspace shared-db
   ```

4. **Run Development Services**

   ```bash
   # Run all services and web app
   npm run dev
   ```

5. **Docker Deployment**
   ```bash
   docker-compose up --build
   ```

## Microservices Architecture

- **Auth Service**: User registration and role-based login (Port 4001)
- **Candidate Service**: Profiles and transparency data (Port 4002)
- **Issue Reporting Service**: Civic issue tracking (Port 4004)
- **... additional services follow the same pattern.**

## API Documentation

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Candidates: `GET /api/candidates`, `GET /api/candidates/:id`
- Issues: `GET /api/issues`, `POST /api/issues`

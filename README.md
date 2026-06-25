# Drafts

A notes management app built with Next.js 16, Shadcn UI, and PostgreSQL.

## Tech stack

- **Framework** — Next.js 16 (App Router, React Server Components)
- **UI** — Shadcn UI + Tailwind CSS v4
- **ORM** — Prisma
- **Database** — PostgreSQL 17
- **Language** — TypeScript

## Running locally

### Prerequisites

- [Node.js 22+](https://nodejs.org)
- [Docker](https://www.docker.com/) (for PostgreSQL)

### 1. Clone and install dependencies

```bash
git clone https://github.com/mahmoudshahin1111/drafts.git
cd drafts
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open [http://localhost:3000](http://localhost:3000).

---

## Running with Docker (full stack)

Builds the Next.js app and starts both the app and database containers:

```bash
cp .env.example .env
docker compose up --build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To stop:

```bash
docker compose down
```

To stop and remove the database volume:

```bash
docker compose down -v
```



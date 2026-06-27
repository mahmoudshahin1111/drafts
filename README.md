# Drafts

![](https://github.com/mahmoudshahin1111/drafts/blob/master/logo.png)

A notes management app built with Next.js 16, Shadcn UI, and PostgreSQL.

## Tech stack

- **Framework** — Next.js 16 (App Router, React Server Components)
- **UI** — Shadcn UI + Tailwind CSS v4
- **ORM** — Prisma
- **Database** — PostgreSQL 17
- **Language** — TypeScript

## Preview:
<img width="1114" height="759" alt="2026-06-27_7-45-55" src="https://github.com/user-attachments/assets/0d93840b-f05e-441c-927f-6fd18053dc79" />


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

### 3. Start PostgreSQL and run the app

```bash
docker compose up -d
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Running with Docker (database only)

Starts PostgreSQL in Docker. The Next.js app runs on your host via `npm run dev`.

```bash
cp .env.example .env
docker compose up -d
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

## Changelog

### v1.0.0

- Added notes view toggle between table and cards (`/notes?view=table` and `/notes?view=cards`)
- Cards view now uses infinite scroll (loads notes page by page)
- Added paginated notes API endpoint at `GET /api/notes`
- Added reusable paged result model: `PagedResult<T>`
- Centralized pagination defaults in `src/constants/page.ts`



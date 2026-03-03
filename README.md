# Distributed Crawler Monorepo

> Do not overlook [`todo.md`](./todo.md), where I listed some tasks that must be completed to make this app production-ready.

This is a **distributed web crawler** project organized as a **monorepo**. It includes multiple packages and apps to handle crawling, scheduling, storage, and worker management in a scalable and modular way.

## Table of Contents

- [Packages](#packages)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Production](#production)
- [Next Iteration](#next-iteration)

---

## Packages

The monorepo is structured using a **workspace-based setup** (`pnpm` workspaces), with the following key packages:

| Package | Description |
|---------|-------------|
| `database` | Contains database entities, migrations, and ORM setup. |
| `worker` | Worker service responsible for crawling and processing jobs. |
| `scheduler` | Scheduler app that queues crawling tasks for workers. |
| `shared` | Shared utilities, types, and helpers used across other packages. |
| `queue` | Contains BullMQ setup. |

> You can adjust this table to match your actual package structure.

---

## Getting Started

### Prerequisites

- Node.js >= 20
- `pnpm` >= 7
- Docker

### Install Dependencies

```bash
pnpm install
```

### Setup Environment Variables
Create a .env file in the root. Use `.env.example` file as a template.

```
cat .env.example > .env
```

## Development

> You need to run Redis and PostgreSQL for development purposes. Run `docker compose up redis postgres` or use use local instances:

```
docker compose up redis postgres -d
```

### Run All Crrawler app (scheduler, worker)

> recommended

```
pnpm dev
```

### Run a Single Package

> Optional

You can run individual packages using `pnpm --filter`:

```
pnpm --filter @crawler/worker dev
pnpm --filter @crawler/scheduler dev
```

## Production

Run application in docker

### Clean
> Stop your **Redis** and **Postgres** instances, if you already used the docker for development purposes

```
docker compose down
```

### Build 
```
docker compose build
```

### Run
```
docker compose up -d
```

## Next iteration
This app is only the first iteration; some tasks need to be completed before running it in production. 

> See [`todo.md`](./todo.md) for more info
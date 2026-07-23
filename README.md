# Monorepo

## Quick start (fresh clone)

```bash
# 1. Install dependencies
pnpm install

# 2. Start the database
docker compose up -d db

# 3. Copy env files, run migrations and seed
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/api-express/.env.example apps/api-express/.env
cd apps/api && npx prisma migrate dev && npx prisma db seed && cd ../..

# 4. Start all services
pnpm --filter api start:dev & pnpm --filter web dev & pnpm --filter api-express start:dev

# 5. Kill old node instances
pkill -f node

# 6 
find . \( -name node_modules -o -name dist -o -name .next \) -type d -prune -exec rm -rf {} +
```

Services:

- API: http://localhost:3001/api/v1
- Swagger: http://localhost:3001/api/docs
- Web: http://localhost:3000
- Mock Analytics: http://localhost:3002

## Run tests

```bash
pnpm --filter api test        # unit tests
pnpm --filter api test:e2e    # e2e tests
pnpm --filter web test        # component tests
```

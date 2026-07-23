```

- Swagger: http://localhost:3001/docs
- API base: http://localhost:3001/

## Run standalone

```bash
cp .env.example .env
docker compose up -d db          # from repo root
pnpm prisma migrate dev
pnpm prisma db seed
pnpm start:dev

npx prisma studio  
```

## Tests

```bash
pnpm test          # unit
pnpm test:e2e      # e2e (requires running database)
pnpm test:cov      # coverage
```
FROM node:24-slim AS base
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm@9.15.4

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api-nestjs/package.json ./apps/api-nestjs/
RUN pnpm install --frozen-lockfile --filter api-nestjs...

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api-nestjs/node_modules ./apps/api-nestjs/node_modules
COPY . .
RUN pnpm --filter api-nestjs build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/api-nestjs/dist ./apps/api-nestjs/dist
COPY --from=builder /app/apps/api-nestjs/node_modules ./apps/api-nestjs/node_modules
COPY --from=builder /app/node_modules ./node_modules

USER node
EXPOSE 3001
CMD ["node", "apps/api-nestjs/dist/main.js"]
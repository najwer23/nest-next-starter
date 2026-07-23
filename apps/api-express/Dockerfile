FROM node:24-alpine AS base
RUN npm install -g pnpm@9.15.4

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api-express/package.json ./apps/api-express/
RUN pnpm install --frozen-lockfile --filter api-express...

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api-express/node_modules ./apps/api-express/node_modules
COPY apps/api-express ./apps/api-express
RUN pnpm --filter api-express build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-express/node_modules ./apps/api-express/node_modules
COPY --from=builder /app/apps/api-express/dist ./apps/api-express/dist

USER node
EXPOSE 3002
CMD ["node", "apps/api-express/dist/main.js"]

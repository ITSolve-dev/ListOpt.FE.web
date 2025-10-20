FROM oven/bun:1-slim AS base

WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS deps

RUN mkdir -p /temp/prod

COPY package.json bun.lock /temp/prod/

RUN cd /temp/prod && bun install --no-cache --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=deps /temp/prod/node_modules ./node_modules
COPY . .

RUN bun run build

FROM oven/bun:1-alpine AS runner

WORKDIR /app

# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]

FROM node:20-alpine AS base

WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm build

# Final stage
FROM base as crawler

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /app/apps/$APP_NAME
CMD ["node", "dist/index.js"]
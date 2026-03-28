# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build 2>/dev/null || true

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install dumb-init and serve
RUN apk add --no-cache dumb-init

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

COPY --from=builder /app/dist ./dist 2>/dev/null || true

EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:5173/ || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

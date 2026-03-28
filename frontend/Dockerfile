# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install dumb-init and a lightweight static file server
RUN apk add --no-cache dumb-init && npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:5173/ || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["serve", "-s", "dist", "-l", "5173"]

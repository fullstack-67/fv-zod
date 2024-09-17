FROM node:22-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi
RUN npm run build
FROM nginx:1.27.0-alpine AS production
COPY ./nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html
# change to bun
FROM oven/bun:latest AS build

WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .
RUN bun run build

# Stage 2
FROM nginx:1.25.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
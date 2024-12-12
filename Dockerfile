# change to bun
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_APP_BASE_URL_VULNER
RUN VITE_APP_BASE_URL_VULNER=$VITE_APP_BASE_URL_VULNER npm run build

# Stage 2
FROM nginx:1.25.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
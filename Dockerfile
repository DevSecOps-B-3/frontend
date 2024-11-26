# change to bun
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .
ARG VITE_APP_BASE_URL
RUN VITE_APP_BASE_URL=$VITE_APP_BASE_URL npm run build

# Stage 2
FROM nginx:1.25.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
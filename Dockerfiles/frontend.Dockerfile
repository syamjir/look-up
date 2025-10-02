# Stage 1: Build the frontend

FROM node:18-alpine AS builder

WORKDIR /app

COPY front-end/package.json front-end/package-lock.json ./

RUN npm install

COPY front-end/ ./

RUN npm run build

# ------------------------------------------------------------

# Stage 2: Serve using a lightweight web server    
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]
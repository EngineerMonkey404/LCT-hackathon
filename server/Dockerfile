FROM node:16.20.0
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
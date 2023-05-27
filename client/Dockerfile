FROM node:16.20.0 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run generate

FROM nginx:1.24.0
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
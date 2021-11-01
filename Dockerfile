FROM node:10 AS builder

WORKDIR /app
COPY . .

RUN npm i && \
    npm run build


FROM nginx

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

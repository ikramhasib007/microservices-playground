# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

RUN npm install -g pnpm
RUN pnpm config set store-dir ~/.pnpm-store

COPY ["package.json", "pnpm-lock.yaml*", "./"]

RUN pnpm install
COPY ./ ./

CMD ["pnpm", "start"]
# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV KUBERNETES_SERVICE_HOST=0
ENV KUBERNETES_SERVICE_PORT=0
# ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g npm@latest
RUN npm install -g pnpm
RUN pnpm config set store-dir ~/.pnpm-store

COPY ["package.json", "pnpm-lock.yaml*", "./"]

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]
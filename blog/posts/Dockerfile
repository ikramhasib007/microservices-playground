FROM node:18-alpine

WORKDIR /usr/app

RUN npm install -g pnpm
RUN pnpm config set store-dir ~/.pnpm-store
COPY ./package.json ./
RUN pnpm install
COPY ./ ./

CMD ["pnpm", "start"]
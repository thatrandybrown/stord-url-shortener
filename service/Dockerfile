FROM node:latest

WORKDIR /app

ENV PORT 80
EXPOSE 80

ENV NODE_ENV production

COPY package*.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn start
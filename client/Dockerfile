FROM node:latest as buildenv

WORKDIR app

COPY package*.json /app/
COPY yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . /app/
RUN yarn build

FROM nginx
COPY --from=buildenv /app/build /usr/share/nginx/html
COPY --from=buildenv /app/nginx.conf /etc/nginx/nginx.conf

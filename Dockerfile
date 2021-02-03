# base image
FROM node:12.20.0-alpine3.12 AS builder
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g
COPY ./ ./
RUN cat .env
RUN npm run build

FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80

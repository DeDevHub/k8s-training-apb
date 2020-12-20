# BUILD STAGE
FROM alpine as build-stage

RUN apk add yarn

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build


# PRODUCTION STAGE
FROM nginx:stable-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html/

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

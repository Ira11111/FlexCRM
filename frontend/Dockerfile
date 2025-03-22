FROM node:20.18

WORKDIR /app/frontend

COPY FlexCRM/package.json ./

RUN npm install

COPY FlexCRM ./

EXPOSE 3000
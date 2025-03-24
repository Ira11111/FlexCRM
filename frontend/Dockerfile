FROM node:20.18

ENV PORT=5173

WORKDIR /app/frontend

COPY FlexCRM/package.json ./

RUN npm install

RUN npm i -g serve

COPY FlexCRM ./

RUN npm run build

EXPOSE 5173


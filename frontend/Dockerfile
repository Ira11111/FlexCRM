FROM node:20.18

WORKDIR /app/frontend

COPY FlexCRM/package.json ./

RUN npm install

RUN npm i -g serve

COPY FlexCRM ./

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
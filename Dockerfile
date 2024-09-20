FROM node:20

ARG MONGO_URL

ENV MONGO_URL=${MONGO_URL}

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

RUN npm run build

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "start dist/index.js" ]
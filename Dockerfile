FROM node:20

RUN mkdir -p /home/node/assignment/node_modules && chown -R node:node /home/node/assignment

WORKDIR /home/node/assignment

COPY package*.json ./

USER node

RUN npm install

RUN npm run build

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "start dist/index.js" ]
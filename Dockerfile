FROM node:20

# ARG MONGO_URL

# ENV MONGO_URL=${MONGO_URL}

RUN apt-get update 

RUN apt-get install -y python-is-python3 make gcc g++ 

# Install google-chrome-stable
RUN apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*


  # Install puppeteer so it's available in the container.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
&& mkdir -p /home/pptruser/Downloads \
&& chown -R pptruser:pptruser /home/pptruser

RUN mkdir -p /home/node/app/node_modules && chown -R pptruser:pptruser /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY --chown=pptruser:pptruser . .

EXPOSE 8080

USER pptruser

CMD [ "node", "dist/index.js" ]
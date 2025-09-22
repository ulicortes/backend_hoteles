FROM node:22
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
CMD [ "node", "--env-file=.env", "index.js" ]
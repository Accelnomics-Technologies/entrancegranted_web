FROM node:16-alpine3.17

WORKDIR /usr/app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
FROM node:14.14.0-alpine as builder
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install


COPY . /usr/src/app

CMD [ "npm", "start" ]
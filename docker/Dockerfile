FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

# # Install TypeScript
RUN npm install -g typescript

RUN npm install && npm cache clean --force

COPY . .

FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY src/ ./src/

EXPOSE 8086

CMD ["node", "src/index.js"]

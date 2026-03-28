FROM node:22.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 8085

CMD ["node", "src/index.js"]

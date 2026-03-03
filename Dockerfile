FROM node:21-alpine
WORKDIR /usr/src/app

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
EXPOSE 3000
CMD ["npm","run","start"]
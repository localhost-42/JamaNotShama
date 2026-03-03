FROM node:21-alpine
WORKDIR ./jns

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
EXPOSE 3000
CMD ["npm","run","start"]
FROM node:20-alpine
WORKDIR ./jns

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

EXPOSE 3000
CMD ["npm","run","start"]
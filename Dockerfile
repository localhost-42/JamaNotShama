FROM node:20-alpine
WORKDIR /jns

COPY backend/package*.json ./backend/
RUN cd backend && npm ci

COPY backend/ ./backend/
RUN cd backend && npm run build

EXPOSE 3000
CMD ["sh","-lc","cd backend && npm run start"]
# ===== build FRONT =====
FROM node:20-alpine AS front
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build   # Vite -> dist

# ===== build BACK =====
FROM node:20-alpine AS back
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

# ===== runtime =====
FROM node:20-alpine
WORKDIR /app

# install prod deps for backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# copy backend build output
COPY --from=back /app/backend/dist ./backend/dist
# copy backend other needed files (אם צריך: views/config/etc)
COPY backend/ ./backend/

# copy frontend build into backend public dir
COPY --from=front /app/frontend/dist ./backend/public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh","-lc","cd backend && npm run start"]
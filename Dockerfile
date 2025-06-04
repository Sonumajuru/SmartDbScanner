FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build frontend
FROM base as builder
WORKDIR /app/frontend
RUN npm install && npm run build

# Final
FROM node:20-alpine
WORKDIR /app
COPY --from=base /app /app
COPY --from=builder /app/frontend/.next /app/frontend/.next
COPY --from=builder /app/frontend/public /app/frontend/public

ENV OPENAI_API_KEY=""
EXPOSE 3000 3001
CMD ["sh", "-c", "node backend/server.js & next start frontend"]


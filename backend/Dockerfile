# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar Prisma Client y construir la aplicación
RUN npx prisma generate
RUN npm run build

# Verificar que el archivo main.js existe en la ubicación correcta
RUN echo "=== Contenido de dist/ ===" && ls -la dist/ && echo "=== Contenido de dist/src/ ===" && ls -la dist/src/ && echo "=== Verificando main.js ===" && ls -la dist/src/main.js

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app

# Instalar dumb-init para manejo de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Generar Prisma Client en producción
RUN npx prisma generate

# Copiar la aplicación construida desde builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Crear directorio uploads
RUN mkdir -p uploads/tour-packages && chown -R nestjs:nodejs uploads

# Verificar archivos copiados en producción
RUN echo "=== Archivos en producción ===" && ls -la dist/ && echo "=== Contenido dist/src/ ===" && ls -la dist/src/

# Cambiar a usuario no-root
USER nestjs

# Exponer el puerto
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Comando para iniciar la aplicación (usando la ruta correcta)
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
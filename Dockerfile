# Etapa de construcción
FROM node:20.9.0 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación de Vite
RUN npm run build

# Etapa de producción (Nginx)
FROM nginx:latest

# Copia el resultado de la construcción al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configura el archivo Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

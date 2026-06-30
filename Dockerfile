# --- Étape 1 : build ---
# utilise l'image Node LTS sur Alpine Linux, et nomme cette étape build
FROM node:lts-alpine AS build
# répertoire de travail à l'intérieur du conteneur
WORKDIR /app
# copie package.json et package-lock.json en premier, avant le reste du code
COPY package*.json ./
RUN npm install

# copie tout le reste du code source dans /app
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
# Lance la compilation. Le dossier dist/ est créé dans /app/dist
RUN npm run build

# --- Étape 2 : serve ---
#  repart de zéro avec une image Nginx minimaliste
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
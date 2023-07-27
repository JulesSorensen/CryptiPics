# Utilisez une image Node.js comme base
FROM node:18.17.0 as build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .

# Exécutez la commande de construction de Webpack pour créer le bundle
RUN npm run build

# Utilisez une image légère basée sur Nginx pour le déploiement
FROM nginx:latest

# Copiez le bundle créé par Webpack dans le répertoire de travail du serveur Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposez le port 80 pour accéder à l'application dans le navigateur
EXPOSE 80

# Commande de démarrage du serveur Nginx
CMD ["nginx", "-g", "daemon off;"]

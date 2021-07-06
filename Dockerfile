FROM node:alpine
EXPOSE 80

WORKDIR /app

# Copie de package.json (checksum + mise en cache)
COPY ./package.json .

# Installation des dépendances
RUN  npm install

# Copie de l'application (checksum + mise en cache)
COPY . .

ENV PATH=$PATH:/app/node_modules/.bin

CMD ["nodemon", "-L", "src/index.js"]
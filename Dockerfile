FROM node:16.19-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

# download dependencies
RUN npm ci && npm cache clean --force

# copy source code to /app/src folder
COPY public ./public
COPY src ./src
COPY codegen.yml ./codegen.yml

# build image
RUN npm install

# compile image into static files
COPY .env .env
RUN npm run build-static

# run
EXPOSE 80
CMD [ "npm", "run", "serve" ]
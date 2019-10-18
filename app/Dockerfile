FROM node:12.8.1-alpine AS build

# Install Nginx
RUN apk add -U nginx

# Install Dependencies
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install

# Build Application
COPY . ./
RUN npm run build

FROM nginx:1.17.4-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

FROM node:14.15-alpine
RUN mkdir /app
WORKDIR /app
RUN npm install -g create-react-app

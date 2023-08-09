FROM node:19.8-alpine

WORKDIR /app1

# ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY ./src src/
ENV MONGODB_URL=${MONGODBURL}

CMD [ "npm", "run", "start" ]
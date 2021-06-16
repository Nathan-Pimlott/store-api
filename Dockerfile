FROM node:14

# Create app directory
WORKDIR /
# Install app dependencies
# USE PACKAGE & PACKAGE-LOCK
COPY package*.json ./

RUN npm install
# IF PRODUCTION
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "nodemon", "/src/index.ts" ]
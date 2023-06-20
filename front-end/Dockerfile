FROM node:18-alpine

WORKDIR /front-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

FROM node:18-alpine

WORKDIR /back-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:alpine

WORKDIR /usr/ebike
ENV PORT=8080

COPY package.json ./
RUN npm install

COPY . .

RUN npm build

EXPOSE 8080
CMD ["npm", "start"]
FROM node:alpine

WORKDIR /usr/ebike
ENV PORT=8080

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]
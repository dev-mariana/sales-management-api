FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm install 

COPY . .

RUN npm run build

FROM node:18-alpine3.19 

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD [ "npm", "run prisma:deploy && npm run start:prod" ]
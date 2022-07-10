FROM node:lts-alpine
 
WORKDIR /usr/src/app
 
COPY package.json package.json
 
RUN npm install yarn
RUN yarn install
 
COPY . /usr/src/app
 
EXPOSE 8010

CMD ["sh", "-c", "yarn run build && yarn start -p 8010"]

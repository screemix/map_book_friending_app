FROM node:12-alpine

WORKDIR '/app'

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python2 alpine-sdk

COPY package.json yarn.lock ./

RUN npm install --quiet node-gyp -g &&\
  npm install --quiet

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start"]
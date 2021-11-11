FROM node:12-alpine

WORKDIR '/app'

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python2 alpine-sdk

COPY package.json yarn.lock ./

RUN npm install --quiet node-gyp -g &&\
  npm install --quiet



RUN yarn
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD ["yarn", "run", "start"]
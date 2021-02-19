FROM lambci/lambda:build-nodejs12.x

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g ts-node
RUN npm install -g yarn
RUN npm install -g serverless

RUN yarn

COPY . .

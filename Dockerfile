FROM node:14-alpine
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile --non-interactive
COPY . .
RUN npm install pm2 -g
RUN yarn tsc
CMD ["pm2-runtime", "./dist/index.js"]
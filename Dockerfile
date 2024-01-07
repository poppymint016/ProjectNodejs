FROM node:alpine
WORKDIR /testsoftnix
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./ ./
ENV NODE_ENV production
CMD ["npm", "run", "dev"]
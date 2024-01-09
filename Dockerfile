FROM node:alpine
WORKDIR /testsoftnix
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./ ./
EXPOSE 3000
ENV NODE_ENV production
CMD ["npm", "run", "dev"]
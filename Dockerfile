FROM node:14.17.3

WORKDIR /usr/src/app

COPY . ./
RUN npm install

EXPOSE 3037

ENV HOST=0.0.0.0
ENV PORT=3037

RUN npm run build

CMD [ "npm", "run", "start" ]

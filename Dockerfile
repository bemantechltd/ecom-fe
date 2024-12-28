FROM node:18.12.0 
# v18.20.5

WORKDIR /usr/src/app

COPY . ./
RUN npx yarn install

EXPOSE 3037

ENV HOST=0.0.0.0
ENV PORT=3037

RUN npm run build

CMD [ "npm", "run", "start" ]

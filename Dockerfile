FROM node

ADD . /
RUN npm install

EXPOSE 3000

CMD ["npm", "start", "--seneca.log=level:info"]
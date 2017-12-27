FROM node:6.2

MAINTAINER Julien Smadja <julien.smadja@gmail.com>

RUN mkdir /whois

WORKDIR /whois

EXPOSE 8000

COPY nodejs/bootstrap.sh bootstrap.sh

COPY database/migrations migrations
COPY database/database.json database.json

COPY nodejs/index.js index.js
COPY nodejs/config config
COPY nodejs/lib lib
COPY nodejs/package.json package.json

ENTRYPOINT ["/whois/bootstrap.sh"]

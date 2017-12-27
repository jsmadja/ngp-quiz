#! /bin/bash
set -e

npm i

node_modules/db-migrate/bin/db-migrate up --env container

NODE_ENV=production node index.js

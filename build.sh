#!/bin/bash

if [[ $1 == "install" ]]
then
  echo '[install fis3..]'
  npm install -g fis3

  echo '[intall pm2..]'
  npm install -g pm2

  echo '[install fis plugs..]'
  npm install fis-parser-babelcore
  npm install fis-parser-less
  npm install fis-optimizer-html-minifier

  echo '[install koa plugs]'
  cnpm install koa
  cnpm install koa-router
  cnpm install koa-redis
  cnpm install koa-static
  cnpm install koa-static-cache
  cnpm install koa-conditional-get
  cnpm install koa-etag
  cnpm install koa-bodyparser
  cnpm install koa-generic-session

  echo '[install server plugs]'
  cnpm install node-schedule
  cnpm install mysql
  cnpm install redis
  cnpm install sequelize
  cnpm install validator
  cnpm install co-body
  cnpm install nodemailer
  cnpm install nodemailer-smtp-transport
  cnpm install log4js

  echo '[install code cover plugs]'
  cnpm install blanket travis-cov

  echo '[install test plugs]'
  cnpm install -g mocha
  cnpm install should co-mocha muk rewire superagent

  cnpm install webpack webpack-dev-server react-hot-loader react-router history
  cnpm install material-ui react-tap-event-plugin extract-text-webpack-plugin

  exit
fi

pm2 delete app.js
pm2 start app.js

testpath=$(find controllers/ models/ lib/ -name "test.js")

echo '[run cover& created coverage.html]'
mocha --harmony -R travis-cov $testpath
mocha --harmony -R html-cov > coverage.html $testpath

echo '[run test]'
mocha --harmony $testpath -s 10 --check-leaks --es_staging

pm2 delete app.js

echo '[run pm2]'
pm2 start --watch --ignore-watch="src static test node_modules" --merge-logs -f app.js -- release

echo '[run webpack..]'
node webpack.js

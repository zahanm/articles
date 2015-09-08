
'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/articles');
const app = koa();

import { User } from './models';

app.use(bodyParser());

router.get('/', function *(next) {
  this.body = 'ohcE';
});

router.get('/me', function *(next) {
  const me = yield User.findOne({ 'alias': this.request.headers.alias }).exec();
  this.body = me;
});

router.post('/me', function *(next) {
  const reqAlias = this.request.body.alias;
  if (!reqAlias || /^\s*$/.exec(reqAlias)) {
    this.throw(`need a valid alias: "${reqAlias}"`, 400);
  }
  let me = yield User.findOne({ 'alias': reqAlias }).exec();
  if (!me) {
    me = new User({
      alias: reqAlias,
    });
    yield me.save();
    this.status = 201;
  }
  this.body = me;
});

app.use(router.routes());

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`"Articles" listening at http://${host}:${port}`);
});

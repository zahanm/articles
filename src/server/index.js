
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

router.use(function *(next) {
  if (!this.request.headers.alias) {
    yield next;
    return;
  }
  const me = yield User.findOne({ 'alias': this.request.headers.alias }).exec();
  if (me) {
    this.user = me;
  }
  yield next;
});

router.get('/me', function *(next) {
  this.body = this.user;
});

router.post('/me', function *(next) {
  const reqAlias = this.request.headers.alias;
  if (!reqAlias || /^\s*$/.exec(reqAlias)) {
    this.throw(`need a valid alias: "${reqAlias}"`, 400);
  }
  if (!this.user) {
    this.user = new User({
      alias: reqAlias,
    });
    yield this.user.save();
    this.status = 201;
  }
  this.body = this.user;
});

app.use(router.routes());

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`"Articles" listening at http://${host}:${port}`);
});

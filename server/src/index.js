
'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/articles');
const app = koa();

import { User, Thread } from './models';
import { nonEmptyString } from './utils';

app.use(bodyParser());

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

router.get('/', function *(next) {
  this.body = 'ohcE';
});

router.get('/me', function *(next) {
  this.body = this.user;
});

router.post('/me', function *(next) {
  this.assert(nonEmptyString(this.request.headers.alias), 400, 'need an alias');
  if (!this.user) {
    this.user = new User({
      alias: this.request.headers.alias,
    });
    yield this.user.save();
    this.status = 201;
  }
  this.body = this.user;
});

router.get('/threads', function *(next) {
  this.assert(this.user, 401, 'need to be authenticated');
  const threads = yield Thread.find({ participants: this.user }).exec();
  this.body = threads;
});

router.post('/thread', function *(next) {
  this.assert(this.user, 401, 'need to be authenticated');
  this.assert(nonEmptyString(this.request.body.name), 400, 'need a name');
  const t = new Thread({
    participants: [ this.user ].concat(this.request.body.others || []),
    name: this.request.body.name,
  });
  yield t.save();
  this.status = 201;
  this.body = t;
});

app.use(router.routes());

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`"ArticlesAPI" listening at http://${host}:${port}`);
});

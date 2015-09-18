
'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const mongoose = require('mongoose');
const gutil = require('gulp-util');

mongoose.connect('mongodb://localhost/articles');
const app = koa();

import { Thread, Link, User } from './models';
import { nonEmptyString } from './utils';

app.use(bodyParser());

router.use(function *(next) {
  yield next;
  gutil.log(
    gutil.colors.green(this.request.method),
    this.request.url,
    gutil.colors.yellow(this.response.status)
  );
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

router.get('/thread', function *(next) {
  this.assert(this.user, 401, 'need to be authenticated');
  this.assert(nonEmptyString(this.request.query.id), 400, 'need an ID');
  const t = yield Thread.findById(this.request.query.id).exec();
  if (!t) {
    this.status = 404;
    return;
  }
  this.body = t;
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

router.get('/links', function *(next) {
  this.assert(this.user, 401, 'need to be authenticated');
  this.assert(nonEmptyString(this.request.query.id), 400, 'need a thread ID');
  const t =
    yield Thread.findById(this.request.query.id, { contents: true }).exec();
  if (!t) {
    this.status = 404;
    return;
  }
  this.body = t.contents;
});

router.get('/link', function *(next) {
  this.assert(this.user, 401, 'need to be authenticated');
  this.assert(nonEmptyString(this.request.query.id), 400, 'need a link ID');
  const l = yield Link.findById(this.request.query.id).exec();
  if (!l) {
    this.status = 404;
    return;
  }
  this.body = l;
});

router.post('/link', function *(next) {
  this.assert(this.user, 401, 'need to be authenticated');
  this.assert(nonEmptyString(this.request.body.id), 400, 'need a thread ID');
  this.assert(nonEmptyString(this.request.body.url), 400, 'need a URL');
  this.assert(nonEmptyString(this.request.body.text), 400, 'need text');
  const t = yield Thread.findById(this.request.body.id).exec();
  if (!t) {
    this.throw(400, 'need a valid thread ID');
  }
  const l = new Link({
    url: this.request.body.url,
    text: this.request.body.text,
  });
  yield l.save();
  t.contents.push(l._id);
  yield t.save();
  this.status = 201;
});

app.use(router.routes());

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  gutil.log(`"ArticlesAPI" listening at http://${host}:${port}`);
});

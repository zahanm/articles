
'use strict';

const bodyParser = require('body-parser');
const co = require('co');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/articles');
const app = express();

import * as models from './models';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ohcE');
});

app.route('/me')
  .get((req, res) => {
    co(function* () {
      const me = yield models.User.findOne({ 'id': req.headers.alias }).exec();
      res.json(me);
    });
  })
  .post((req, res) => {
    co(function* () {
      if (!req.body.alias || /^\s*$/.exec(req.body.alias)) {
        res.status(400).json({ msg: `need a valid alias: ${req.body.alias}` });
      }
      const me = new models.User({
        alias: req.body.alias,
      });
      yield me.save();
      res.json(me);
    });
  });

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`"Articles" listening at http://${host}:${port}`);
});

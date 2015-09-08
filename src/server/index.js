
'use strict';

const bodyParser = require('body-parser');
const co = require('co');
const express = require('express');

import * as models from './models';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ohcE');
});

app.get('/me', (req, res) => {
  console.log(req.query);
  console.log(req.headers);
  res.sendStatus(200);
  return;
  co(function* () {
    const me = yield models.User.findOne({ 'id': req.id }).exec();
    res.json(me.toArray());
  });
});

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`"Articles" listening at http://${host}:${port}`);
});

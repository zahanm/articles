
'use strict';

const express = require('express');
const app = express();

import * as models from "./models";

app.get('/', (req, res) => {
  res.send('ohcE');
});

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`"Articles" listening at http://${host}:${port}`);
});

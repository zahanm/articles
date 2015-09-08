
'use strict';

let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send('Hello World out there!');
});

var server = app.listen(8000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

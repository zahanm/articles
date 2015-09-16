
'use strict';

module.exports = {

  ENDPOINT: 'http://localhost:8000',

  authenticatedHeaders(): Headers {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('alias', 'zahanm');
    return headers;
  },

};

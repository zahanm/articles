
'use strict';

module.exports = {

  ENDPOINT: 'http://localhost:8000',

  authenticatedHeaders(): Headers {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('alias', 'zahanm');
    return headers;
  },

};

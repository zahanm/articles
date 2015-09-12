
'use strict';

module.exports = {

  ENDPOINT: 'http://localhost:8000',

  auth() {
    let h = new Headers();
    h.set('alias', 'zahanm');
    return h;
  },

};

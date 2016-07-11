'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'apuqa-secret',

  FACEBOOK_ID:      '516046061925828',
  FACEBOOK_SECRET:  '76fb2934906edce31aae20ac7848c232',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};

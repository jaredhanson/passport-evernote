var vows = require('vows');
var assert = require('assert');
var util = require('util');
var evernote = require('passport-evernote');


vows.describe('passport-evernote').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(evernote.version);
    },
  },
  
}).export(module);

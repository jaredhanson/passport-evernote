var vows = require('vows');
var assert = require('assert');
var util = require('util');
var EvernoteStrategy = require('../lib/strategy');


vows.describe('EvernoteStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new EvernoteStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named meetup': function (strategy) {
      assert.equal(strategy.name, 'evernote');
    },
  },
  
  'strategy': {
    topic: function() {
      return new EvernoteStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'when parsing response params for user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        process.nextTick(function () {
          strategy.userProfile('', '', { 'edam_shard': 's1', 'edam_userId': '64468' }, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'evernote');
        assert.equal(profile.id, '64468');
        assert.equal(profile.shard, 's1');
      },
    },
  },

}).export(module);

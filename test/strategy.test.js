var chai = require('chai')
  , EvernoteStrategy = require('../lib/strategy');


describe('Strategy', function() {
  
  describe('constructed', function() {
    var strategy = new EvernoteStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret'
    }, function(){});
    
    it('should be named fitbit', function() {
      expect(strategy.name).to.equal('evernote');
    });
  })
  
  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new EvernoteStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })
  
});

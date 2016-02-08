var EvernoteStrategy = require('../lib/strategy')
  , fs = require('fs');


describe('Strategy#userProfile', function() {
  
  describe.only('parsed from parameters in access token response', function() {
    var strategy = new EvernoteStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret'
    }, function verify(){});
    
    strategy._oauth.get = function(url, token, tokenSecret, callback) {
      return callback(new Error('should not be called'));
    }
    
    
    var profile;
  
    before(function(done) {
      strategy.userProfile('token', 'token-secret', { 'edam_shard': 's1', 'edam_userId': '64468' }, function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
  
    it('should parse profile', function() {
      expect(profile.provider).to.equal('evernote');
      expect(profile.id).to.equal('64468');
      expect(profile.shard).to.equal('s1');
    });
  
    it('should not set raw property', function() {
      expect(profile._raw).to.be.undefined;
    });
  
    it('should not set json property', function() {
      expect(profile._json).to.be.undefined;
    });
  }); // parsed from parameters in access token response
  
});

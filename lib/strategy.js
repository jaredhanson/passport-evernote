/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;


/**
 * `Strategy` constructor.
 *
 * The Evernote authentication strategy authenticates requests by delegating to
 * Evernote using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerKey`     identifies client to Evernote
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which Evernote will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new EvernoteStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/evernote/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://www.evernote.com/oauth';
  options.accessTokenURL = options.accessTokenURL || 'https://www.evernote.com/oauth';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://www.evernote.com/OAuth.action';
  options.sessionKey = options.sessionKey || 'oauth:evernote';
  
  OAuthStrategy.call(this, options, verify);
  this.name = 'evernote';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);


/**
 * Retrieve user profile from Evernote.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `id`
 *   - `shard`
 *
 * Note that because Evernote supplies basic profile information in query
 * parameters when redirecting back to the application, loading of Evernote
 * profiles *does not* result in an additional HTTP request.
 *
 * @param {String} token
 * @param {String} tokenSecret
 * @param {Object} params
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
  var profile = { provider: 'evernote' };
  profile.id = params.edam_userId;
  profile.shard = params.edam_shard;
  
  return done(null, profile);
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;

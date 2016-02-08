# passport-evernote

[![Build](https://img.shields.io/travis/jaredhanson/passport-evernote.svg)](https://travis-ci.org/jaredhanson/passport-evernote)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/passport-evernote.svg)](https://coveralls.io/r/jaredhanson/passport-evernote)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/passport-evernote.svg?label=quality)](https://codeclimate.com/github/jaredhanson/passport-evernote)
[![Dependencies](https://img.shields.io/david/jaredhanson/passport-evernote.svg)](https://david-dm.org/jaredhanson/passport-evernote)


[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Evernote](http://www.evernote.com/) using the OAuth 1.0a API.

This module lets you authenticate using Evernote in your Node.js applications.
By plugging into Passport, Evernote authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-evernote

## Usage

#### Configure Strategy

The Evernote authentication strategy authenticates users using a Evernote
account and OAuth tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a consumer key, consumer secret, and callback URL.

    passport.use(new EvernoteStrategy({
        consumerKey: EVERNOTE_CONSUMER_KEY,
        consumerSecret: EVERNOTE_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/evernote/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ evernoteId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'evernote'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/evernote',
      passport.authenticate('evernote'));
    
    app.get('/auth/evernote/callback', 
      passport.authenticate('evernote', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-evernote/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-evernote.png)](http://travis-ci.org/jaredhanson/passport-evernote)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

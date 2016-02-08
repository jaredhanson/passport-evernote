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

#### Create an Application

Before using `passport-evernote`, you must first get an Evernote API key. If you
have not already done so, an API key can be requested at [Evernote Developers](https://dev.evernote.com/).
Your will be issued an API key and secret, which need to be provided to the
strategy.

#### Configure Strategy

The Evernote authentication strategy authenticates users using an Evernote
account and OAuth tokens.  The API key secret obtained from Evernote are
supplied as options when creating the strategy.  The strategy also requires a
`verify` callback, which receives the access token and corresponding secret as
arguments, as well as `profile` which contains the authenticated user's Evernote
profile.   The `verify` callback must call `cb` providing a user to complete
authentication.

    passport.use(new EvernoteStrategy({
        consumerKey: EVERNOTE_CONSUMER_KEY,
        consumerSecret: EVERNOTE_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/evernote/callback"
      },
      function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ evernoteId: profile.id }, function (err, user) {
          return cb(err, user);
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

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-evernote-example)
as a starting point for their own web applications.  The example shows how to
authenticate users using Twitter.  However, because both Twitter and Evernote
use OAuth 1.0, the code is similar.  Simply replace references to Twitter with
corresponding references to Evernote.

## FAQ

##### How do I test against the Evernote sandbox?

Supply the sandbox endpoint URLs as options to the strategy, as follows:

```js
new EvernoteStrategy({
  requestTokenURL: 'https://sandbox.evernote.com/oauth',
  accessTokenURL: 'https://sandbox.evernote.com/oauth',
  userAuthorizationURL: 'https://sandbox.evernote.com/OAuth.action',
  consumerKey: EVERNOTE_CONSUMER_KEY,
  consumerSecret: EVERNOTE_CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/evernote/callback"
}
```

## Contributing

#### Tests

The test suite is located in the `test/` directory.  All new features are
expected to have corresponding test cases.  Ensure that the complete test suite
passes by executing:

```bash
$ make test
```

#### Coverage

The test suite covers 100% of the code base.  All new feature development is
expected to maintain that level.  Coverage reports can be viewed by executing:

```bash
$ make test-cov
$ make view-cov
```

## Support

#### Funding

This software is provided to you as open source, free of charge.  The time and
effort to develop and maintain this project is dedicated by [@jaredhanson](https://github.com/jaredhanson).
If you (or your employer) benefit from this project, please consider a financial
contribution.  Your contribution helps continue the efforts that produce this
and other open source software.

Funds are accepted via [PayPal](https://paypal.me/jaredhanson), [Venmo](https://venmo.com/jaredhanson),
and [other](http://jaredhanson.net/pay) methods.  Any amount is appreciated.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

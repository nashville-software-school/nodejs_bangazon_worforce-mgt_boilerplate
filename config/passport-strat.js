'use strict';

// This module will be executed in app.js.

// module for creating a hash of passwords
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');

// initialize the passport-local strategy
const { Strategy } = require('passport-local');
let User = null;

// Then define our custom strategy with our instance of the LocalStrategy. Takes two args
const ourLocalStrategy = new Strategy(
  // arg 1: declare what request (req) fields our usernameField and passwordField (passport variables) are.
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback,
    // which is particularly useful for signing up.
  },
  // arg2 callback, handle storing a user's details.
  (req, email, password, done) => {
    console.log('local strat callback');
    User = req.app.get('models').User;

    // add our hashed password generating function inside the callback function
    const generateHash = (password) => {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    // using the Sequelize user model we initialized earlier as User, we check to see if the user already exists, and if not we add them.
    User.findOne({
      where: {email} // remember, this is object literal shorthand. Same as { email: email}
    }).then( (user) => {
      if (user) {
        return done(null, false, {
          message: 'That email is already taken'
        });
      } else {
          const userPassword = generateHash(password); //function we defined above
          const data =
            // values come from the req.body, added by body-parser when register form request is submitted
            {
              email,
              password: userPassword,
              username: req.body.username,
            };
          // create() is a Sequelize method
          User.create(data).then( (newUser, created) => {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
    });
  }
);

//serialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    if (user) {
        done(null, user.get());
    } else {
        done(user.errors, null);
    }
  });
});

// Take the new strategy we just created and use it as middleware, so the http requests get piped through it.
// The POST to register will trigger this, because we will call passport.authenticate in the auth ctrl.
// The first argument is optional and it sets the name of the strategy.
passport.use('local-signup', ourLocalStrategy);

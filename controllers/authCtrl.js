'use strict';
const passport = require('passport');

module.exports.display = (req, res) => {
  res.render('register');
}

module.exports.register = (req, res, next) => {
  console.log('register called!');

  passport.authenticate('local-signup', (err, user, msg) => {
    console.log("Where are we? session.js", user );
    if (err) {  console.log(err) } //or return next(err)
    if (!user) { return res.render('register', msg)}

    req.logIn(user, err => {
      if (err) { return next(err) }
      console.log("authenticated. Rerouting to home!" );
      // Save a msg in a cookie whose value will be added to req
      // using https://www.npmjs.com/package/express-flash-2 docs, but installed express-flash
      req.flash('registerMsg', 'Thanks for signing up!');
      res.redirect('/welcome');
    })
  })(req, res, next);

  // first argument is name of the passport strategy we created in passport-strat.js
  // passport.authenticate('local-signup', {
  //   // these are passport-created properties. Nifty, eh?
  //   successRedirect: '/computer', //just 'cause I got nowhere else to route to at the moment
  //   failureRedirect: '/register' // reload form if they screw it up somehow
  //   }, (err, user, msg) => {
  //     console.log('Anyone home?');

  //     if (err) { console.log('error registering', err);}
  //   }
  // )
};

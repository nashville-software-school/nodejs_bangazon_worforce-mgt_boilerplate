'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  console.log('login', req.body.password);
  res.render('welcome', {user: req.body.username});
});

// pipe all other requests through the route modules
router.use(require('./computerRoute'));
router.use(require('./authRoute'));
// router.use(require('./foo'));

module.exports = router;

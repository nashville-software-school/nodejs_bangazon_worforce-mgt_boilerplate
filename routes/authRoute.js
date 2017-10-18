'use strict';

const { Router } = require('express');
const router = Router();
// const
const {displayRegister, register, displayLogin, login, welcome} = require('../controllers/authCtrl.js');

// new users
router.get('/register', displayRegister);
router.post('/register', register);

// login existing users
router.get('/login', displayLogin);
router.post('/login', login);

router.get('/welcome', welcome);

module.exports = router;


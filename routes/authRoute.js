'use strict';

const { Router } = require('express');
const router = Router();
// const
const {display, register} = require('../controllers/authCtrl.js');

router.get('/register', display);
router.post('/register', register)

module.exports = router


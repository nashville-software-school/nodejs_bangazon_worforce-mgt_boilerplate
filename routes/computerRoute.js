'use strict';

const { Router } = require('express');
const router = Router();

const { getComputers, addComputer } = require('../controllers/computerCtrl');

// When the request is a GET on the computers route, call get Computers
router.get('/computers', getComputers);
router.post('/computers', addComputer);

module.exports = router;

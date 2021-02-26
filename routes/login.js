const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authcontroller = require('../controllers/Authcontroller');

/* GET login form */
router.get('/', authcontroller.show);

/* POST login */
router.post('/',
  body('username').notEmpty().trim().toLowerCase(),
  body('password').notEmpty(),
  body('rememberme').toBoolean(),
  authcontroller.store
);


module.exports = router;
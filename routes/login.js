var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { query } =require('../models/db');
const authcontroller = require('../controllers/Authcontroller')
const { body, validationResult } = require('express-validator');

/* GET login form */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title: 'Schoolsoft'});
});

router.get('/kryptan/:pwd', function(req, res, next) {
  const myPlaintextPassword = req.params.pwd;
  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    // Store hash in your password DB.
    res.json({
      pwd: hash
    });
});
});

/* POST login */
router.post('/', 
body('username').notEmpty().trim(),
body('password').notEmpty(),
authcontroller.store
);

module.exports = router;
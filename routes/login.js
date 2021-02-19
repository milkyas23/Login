var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { query } =require('../models/db');
const { body, validationResult } = require('express-validator');
const Logincontroller = require ('../controllers/LoginController');

/* GET login form */
router.get('/', Logincontroller.show);
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
Logincontroller.store);


//
  //if (password == "123") {
  //  // kod för att kolla uppgifter med db
  //  // om login rätt sätt session
//
  //  req.session.loggedin= true;
  //  req.session.username=username;
  //  res.redirect('/topsecret');
//
  //} else {
  //  // kommentera ut vid felsökning
  //  res.render(
  //    'login',
  //    {
  //      title: 'Schoolsoft',
  //      error: 'FEL!',
  //      databas
  //    }
  //
  //});



//if (password == "Secret123") {
//     // kod för att kolla uppgifter med db
//     // om login rätt sätt session
   
//     res.render('/topsecret');

//   } else {
//     // kommentera ut vid felsökning
//     res.render(
//       'login',
//       {
//         title: 'Schoolsoft',
//         error: 'FEL!'
//       }
//     );
//   }





module.exports = router;
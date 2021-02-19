var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { query } =require('../models/db');
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
async function(req, res, next) {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', {errors: errors.array()});
      //return res.status(400).json({ errors: errors.array() });
    }

  console.log(req.body);
  

  const username = req.body.username;
  const password = req.body.password;
  
    try{
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result= await query(sql, username);

         
      if (result.length > 0){
      bcrypt.compare(password, result[0].password, function(error, result){
        console.log('result')
        if (result = true){
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/home');
        } else {
          res.render('login',{errors: 'wrong username or password!'});
        }
      });
    }else {
      res.render('login',{errors: 'wrong username or password!'});
    }
   
    }catch(e){
        next(e);
        console.error(e);
    } 
      });
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
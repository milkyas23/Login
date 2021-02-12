var express = require('express');
var router = express.Router();

/* GET login form */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title: 'Schoolsoft'});
});

/* POST login */
router.post('/', function(req, res, next) {

  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  if (password == "123") {
    // kod för att kolla uppgifter med db
    // om login rätt sätt session

    req.session.loggedin= true;
    req.session.username=username;
    res.redirect('/topsecret');

  } else {
    // kommentera ut vid felsökning
    res.render(
      'login',
      {
        title: 'Schoolsoft',
        error: 'FEL!'
      }
    );
  }


});


module.exports = router;
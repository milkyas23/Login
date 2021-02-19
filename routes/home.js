var express = require('express');
var router = express.Router();

/* GET topsecret page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.send('Du är inlogad'); 
  } else{
  res.render('please login to view this page!');
  }
});

module.exports = router;

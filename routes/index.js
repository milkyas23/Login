var express = require('express');
var router = express.Router();
const Logincontroller = require ('../controllers/LoginController');

router.get('/', function(req,res,next) {
    res.render('index',{title: 'Express'});   
});

router.post('/logout', Logincontroller.destroy);

module.exports = router;
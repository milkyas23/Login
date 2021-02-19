const bcrypt = require('bcrypt');
const { query } =require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function (req,res,next) {

    return res.render('login');
};
module.exports.store = async function (req,res,next) {
  

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
            

};

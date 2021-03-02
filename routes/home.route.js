const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { query } = require('../models/db.model');
const { verify } = require('../middlewares/verify');

/* GET topsekret page. */
router.get('/', verify, (req, res, next) => {
    res.render('home', {
      username: req.session.username
    });
});

router.get('/edit', (req, res, next) => {
  res.render('useredit')
});

router.post('/edit', 
  body('newusername').notEmpty().trim(),
  async (req, res, next) => {
    // logiken för detta kan med fördel flyttas till en controller
    if (req.session.loggedin) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('home',{ errors: errors.array() });
      }
      // edit user
      const sql = 'UPDATE users SET name = ? WHERE id = ?';
      const result = await query(sql, [req.body.newusername, req.session.userid]);
      if (result.changedRows == 1) {
        req.session.username = req.body.newusername;
        return res.render('home', {
          username: req.session.username
        });  
      } else {
        return res.status(400).render('home',{ errors: errors.array() });
      }
    } else {
      return res.redirect('/login');
    }
});

module.exports = router;
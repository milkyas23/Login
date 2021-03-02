const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { query } = require('../models/db.model');
const { verify } = require('../middlewares/verify');

/* GET all meeps */
router.get('/',
  async (req, res, next) => {
    const sql = 'SELECT meeps.*, users.name AS author FROM meeps JOIN users ON meeps.user_id = users.id';
    result = await query(sql);
    // res.send(result);
    res.render('meeps', { meeps: result })
});

/* GET form for posting a new meep  */
router.get('/new',
  verify,
  (req, res, next) => {
    res.render('meepsform');
});

/* GET form for updating a meep  */
router.get('/update/:id',
  param('id').isInt(),
  verify,
  async (req, res, next) => {
    const sql = 'SELECT meeps.*, users.name FROM meeps JOIN users ON meeps.user_id = users.id WHERE meeps.id = ?';
    result = await query(sql, req.params.id);
    res.render('meepsform', { meep: result[0] });
});

/* GET a meep */
router.get('/:id',
  param('id').isInt(),
  async (req, res, next) => {
    const sql = 'SELECT meeps.*, users.name AS author FROM meeps JOIN users ON meeps.user_id = users.id WHERE meeps.id = ?';
    result = await query(sql, req.params.id);
    res.send(result);
});

/* POST a new meep */
router.post('/',
  body('body').notEmpty(),
  verify,
  async (req, res, next) => {
    const sql = 'INSERT INTO meeps (user_id, body, created_at, updated_at) VALUES (?, ?, now(), now())';
    const result = await query(sql, [req.session.userid, req.body.body]);
    if (result.insertId > 0) {
      res.redirect('/meeps/' + result.insertId);
    }
});

/* POST a new meep */
router.post('/update',
  body('meepid').isInt(),
  body('body').notEmpty(),
  verify,
  async (req, res, next) => {
    const sql = 'UPDATE meeps SET body = ?, updated_at = now() WHERE id = ?';
    const result = await query(sql, [req.body.body, req.body.meepid]);
    if (result.changedRows > 0) {
      res.redirect('/meeps/' + req.body.meepid);
    }
});

/* POST to delete a meep */
router.post('/delete',
  body('meepid').isInt(),
  verify,
  async (req, res, next) => {
    const sql = 'DELETE FROM meeps WHERE id = ?';
    const result = await query(sql, req.body.meepid);
    if (result.affectedRows > 0) {
      res.redirect('/meeps');
    }
});

module.exports = router;
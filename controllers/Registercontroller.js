const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function(req, res, next) {
  if (req.session.loggedin) {
    return res.redirect('/home');
  }
  return res.render('register', { title: 'Loginsidan'});
};

module.exports.store = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('register', { errors: errors.array() });
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) throw err;
      try {
        const sql = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, now(), now())';
        const result = await query(sql, [username, email, hash]);

        if (result.insertId > 0) {
          res.render('login', {username: username});
        }

      } catch (e) {
        console.table(e);
        if (e.errno === 1062) {
          return res.render('register', {
            username: e.sqlMessage.includes('users.name') ? 'Duplicate entry' : null,
            email: e.sqlMessage.includes('users.email') ? 'Duplicate entry' : null,
          });
        } else {
          next(e);
        }
      }
    });
};

module.exports.destroy = async function(req, res, next) {
  const id = req.params.id;
  const password = req.body.password;
  if (id === req.session.userid) {
    // delete user kolla password för usern om du ska vara riktigt säker innan delete
    // bcrypt password använda då WHERE password = hash AND id = id
    const sql = 'DELETE FROM users WHERE id = ?';
  }
};

module.exports.update = async (req, res, next) => {
  const id = req.session.userid; // vi vill ha ett user id, men vi behöver kolla så den usern faktiskt är inloggad
  console.table(req.body);
  if (id) {
    // vi kan behöva sätta userid vid inlog
    // för extra säkerhet så kräv password vid ändring av username/password
    // byta username
    const sql = 'UPDATE users SET name=? WHERE id = ?'; // name och id
  }
};
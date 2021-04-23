const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.localhost,
  user: process.env.milkyas8,
  password: process.env.Milkyas8,
  database: process.env.Database
});

function query (sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, function (err, result, fields) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = { pool, query };
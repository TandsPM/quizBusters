const db = require('../connection');

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUserById };

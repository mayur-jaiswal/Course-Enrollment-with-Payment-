const db = require('../config/db');

const Transaction = {
    create: (data, callback) => db.query('INSERT INTO transactions SET ?', data, callback)
};

module.exports = Transaction;

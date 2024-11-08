const db = require('../config/db');

const Course = {
    getAll: (callback) => db.query('SELECT * FROM courses WHERE discount_end >= NOW()', callback),
    getById: (id, callback) => db.query('SELECT * FROM courses WHERE id = ?', [id], callback),
    create: (data, callback) => db.query('INSERT INTO courses SET ?', data, callback),
    update: (id, data, callback) => db.query('UPDATE courses SET ? WHERE id = ?', [data, id], callback),
    delete: (id, callback) => db.query('DELETE FROM courses WHERE id = ?', [id], callback),
};

module.exports = Course;
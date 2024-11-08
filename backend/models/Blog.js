const db = require('../config/db');

const Blog = {
    getAll: (callback) => db.query('SELECT * FROM blog_posts WHERE published_at <= NOW()', callback),
    create: (data, callback) => db.query('INSERT INTO blog_posts SET ?', data, callback),
    schedule: (data, callback) => db.query('UPDATE blog_posts SET published_at = ? WHERE id = ?', [data.published_at, data.id], callback)
};

module.exports = Blog;

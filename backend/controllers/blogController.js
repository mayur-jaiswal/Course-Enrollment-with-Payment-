const Blog = require('../models/Blog');

exports.getAllBlogs = (req, res) => {
    Blog.getAll((err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createBlog = (req, res) => {
    const data = req.body;
    Blog.create(data, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Blog created successfully' });
    });
};

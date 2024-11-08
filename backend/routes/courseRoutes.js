const express = require('express');
const router = express.Router();
const db = require('../db');  

router.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

module.exports = router;

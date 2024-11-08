const Course = require('../models/Course');

exports.getAllCourses = (req, res) => {
    Course.getAll((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
};

exports.getCourseById = (req, res) => {
    const courseId = req.params.id;
    Course.getById(courseId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (result.length === 0) {
            res.status(404).send('Course not found');
        } else {
            res.json(result[0]);
        }
    });
};

exports.createCourse = (req, res) => {
    const newCourse = req.body;
    Course.create(newCourse, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
        }
    });
};

exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const updatedCourseData = req.body;
    Course.update(courseId, updatedCourseData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Course not found');
        } else {
            res.json({ message: 'Course updated successfully' });
        }
    });
};

exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;
    Course.delete(courseId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Course not found');
        } else {
            res.json({ message: 'Course deleted successfully' });
        }
    });
};

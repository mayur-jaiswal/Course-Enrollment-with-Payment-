const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const blogRoutes = require('./routes/blogRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payment', paymentRoutes);

module.exports = app;

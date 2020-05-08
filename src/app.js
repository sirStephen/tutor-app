const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const course = require('./routes/course.route');
const user = require('./routes/user.route');
const tutor = require('./routes/tutor.route');
const category = require('./routes/category.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/v1', course);
app.use('/v1', user);
app.use('/v1', tutor);
app.use('/v1', category)

app.get('/', (req, res) => res.send('Online Tutor App'))

module.exports = app;
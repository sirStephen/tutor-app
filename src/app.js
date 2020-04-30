const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const course = require('./routes/course.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/v1', course);

app.get('/', (req, res) => res.send('Hello World!'))

module.exports = app;
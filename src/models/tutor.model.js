const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./course.model');

const tutorSchema = new Schema(
    {
        name: { type: String, required: true },
        course: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Course'
        }
    }
);

module.exports = mongoose.model('Tutor', tutorSchema);
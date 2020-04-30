const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        course: String,
        track: String,
    }
);

module.exports = mongoose.model('Course', courseSchema);
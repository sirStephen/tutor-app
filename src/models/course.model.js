const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        course: { type: String, required: true },
        track: { type: String, required: true },
    }
);

module.exports = mongoose.model('Course', courseSchema);
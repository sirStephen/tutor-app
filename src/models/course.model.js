const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        course: { type: String, required: true },
        category: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category' 
        }]
    }
);

module.exports = mongoose.model('Course', courseSchema);
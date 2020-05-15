const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
    {
        course: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Courses' 
        }],
        category: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category' 
        }]
    }
);

module.exports = mongoose.model('Course', lessonSchema);